import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Chess } from "chess.js";
import { openings } from "../data/openings";
import { ChessBoard } from "../components/ChessBoard";
import { MobileLayout } from "../components/MobileLayout";
import { useProgress } from "../context/ProgressContext";

export function Phase3Test() {
  const { openingId } = useParams<{ openingId: string }>();
  const navigate = useNavigate();
  const { completeOpening } = useProgress();
  
  const opening = openings.find((o) => o.id === openingId);

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [moveMade, setMoveMade] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [results, setResults] = useState<{ scenarioId: string; correct: boolean; userMove: { from: string; to: string } }[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentFen, setCurrentFen] = useState<string | undefined>(undefined);

  if (!opening) {
    return <div>Opening not found</div>;
  }

  const scenario = opening.practiceScenarios[currentMoveIndex];
  const activeFen = currentFen ?? scenario.initialFen;

  const validateMove = (from: string, to: string): boolean => {
    return from === scenario.correctMove.from && to === scenario.correctMove.to;
  };

  const handleMove = (from: string, to: string) => {
    // Check if trying to capture own piece
    const chess = new Chess(activeFen);
    const fromPiece = chess.get(from);
    const toPiece = chess.get(to);
    if (fromPiece && toPiece && fromPiece.color === toPiece.color) {
      // Don't allow capturing own pieces - just return without doing anything
      return;
    }
    
    // Update the board with the user's move - only proceed if legal
    try {
      chess.move({ from, to, promotion: 'q' });
      setCurrentFen(chess.fen());
    } catch (error) {
      // Move is illegal - don't update the board or record it
      console.log('Illegal move attempted, ignoring');
      return;
    }
    
    // Move was legal, now check if it was correct and record it
    const correct = validateMove(from, to);
    setMoveMade(true);
    
    // Store or update the result for this scenario
    setResults(prev => {
      const existingIndex = prev.findIndex(r => r.scenarioId === scenario.id);
      const newResult = {
        scenarioId: scenario.id,
        correct,
        userMove: { from, to }
      };
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newResult;
        return updated;
      } else {
        return [...prev, newResult];
      }
    });
  };

  const handleNext = () => {
    // Apply opponent's response first if it exists
    if (scenario.opponentResponse) {
      const chess = new Chess(currentFen ?? activeFen);
      try {
        const move = chess.move({ 
          from: scenario.opponentResponse.from, 
          to: scenario.opponentResponse.to, 
          promotion: 'q' 
        });
        // Only update FEN if the move was legal
        if (move) {
          setCurrentFen(chess.fen());
        }
      } catch (error) {
        // If opponent response was illegal, try alternative move (pawn advances forward)
        console.log('Opponent response was illegal, trying alternative move');
        try {
          const alternativeMove = chess.move({ from: 'c7', to: 'c6', promotion: 'q' });
          if (alternativeMove) {
            setCurrentFen(chess.fen());
          }
        } catch (altError) {
          console.log('Alternative move also illegal, skipping');
        }
      }
    }
    
    if (currentMoveIndex < opening.practiceScenarios.length - 1) {
      setCurrentMoveIndex(prev => prev + 1);
      setMoveMade(false);
      setResetKey(prev => prev + 1);
    } else {
      setShowAssessment(true);
      completeOpening(openingId!);
    }
  };

  const handleUndo = () => {
    setMoveMade(false);
    setResetKey(prev => prev + 1);
    
    // Remove the result for this scenario
    setResults(prev => prev.filter(r => r.scenarioId !== scenario.id));
    
    // Reset to the current scenario's initial FEN (before the user's move)
    setCurrentFen(undefined);
  };

  const handleRevise = () => {
    navigate(`/phase2/${openingId}`);
  };

  const handleFinish = () => {
    navigate("/progress");
  };

  // Assessment screen
  if (showAssessment) {
    const totalScenarios = results.length;
    const correctCount = results.filter(r => r.correct).length;
    const isPerfectScore = correctCount === totalScenarios;

    return (
      <MobileLayout>
        <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-8">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <p className="font-alatsi-regular text-[14px] text-[#85997c] text-center mb-2">
                Phase 3/3: Assessment Complete
              </p>
              <h1 className="font-aleo-regular text-2xl text-center text-[#1e392e]">
                {opening.name}
              </h1>
            </div>

            <div className="bg-white border-2 border-[#9fbaa9] p-6 mb-4 rounded-[5px]">
              <h2 className="font-aleo-regular text-xl mb-4 text-[#1e392e] text-center">Your Results</h2>

              <div className="space-y-3 mb-6">
                {results.map((result, i) => {
                  const s = opening.practiceScenarios[i];
                  return (
                    <div key={result.scenarioId} className="p-3 border-2 border-[#9fbaa9] rounded-[5px]">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-[#1e392e]">Move {i + 1}</p>
                        {result.correct ? (
                          <span className="font-alatsi-regular text-[14px] text-[#29573b]">✓ Correct</span>
                        ) : (
                          <span className="font-alatsi-regular text-[14px] text-[#85997c]">✗ Incorrect</span>
                        )}
                      </div>
                      <p className="text-xs text-[#85997c] mb-1">{s.description}</p>
                      {!result.correct && (
                        <p className="text-xs text-[#85997c] mt-2">
                          Correct move: {s.correctMove.from} → {s.correctMove.to}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t-2 border-[#9fbaa9] pt-4">
                <p className="text-center text-[#1e392e]">
                  {correctCount}/{totalScenarios} correct
                </p>
                <p className="text-center text-sm text-[#85997c] mt-1">
                  {isPerfectScore
                    ? "Perfect score! You've mastered this opening."
                    : "Review the correct moves and try again."}
                </p>
              </div>
            </div>

            {isPerfectScore ? (
              <button
                onClick={handleFinish}
                className="w-full px-6 py-3 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px]"
              >
                Continue &gt;
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAssessment(false);
                  setCurrentMoveIndex(0);
                  setMoveMade(false);
                  setResetKey(prev => prev + 1);
                  setResults([]);
                  setCurrentFen(undefined);
                }}
                className="w-full px-6 py-3 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px]"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-8">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <p className="font-alatsi-regular text-[14px] text-[#85997c] text-center mb-2">
              Phase 3/3: Independent Attempt
            </p>
            <h1 className="font-aleo-regular text-2xl text-center text-[#1e392e]">
              {opening.name}
            </h1>
          </div>

          <div className="bg-white border-2 border-[#9fbaa9] p-6 mb-4">
            <p className="font-aleo-regular text-[#375c2b] text-center mb-4">Move {currentMoveIndex + 1}/{opening.practiceScenarios.length}</p>

            <ChessBoard
              key={`${openingId}-${resetKey}`}
              onMove={handleMove}
              disabled={moveMade}
              showHints={false}
              initialFen={activeFen}
              resetKey={resetKey}
              enforceTurns={false}
              flipped={openingId === "scandinavian"}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRevise}
              className="flex-1 px-6 py-3 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
            >
              Revise
            </button>
            <button
              onClick={handleUndo}
              className="flex-1 px-6 py-3 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
              disabled={!moveMade}
            >
              Undo
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px]"
              disabled={!moveMade}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}