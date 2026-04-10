import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { openings } from "../data/openings";
import { ChessBoard } from "../components/ChessBoard";
import { MobileLayout } from "../components/MobileLayout";

export function Phase2Practice() {
  const { openingId } = useParams<{ openingId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const opening = openings.find((o) => o.id === openingId);
  // Check if we came from Phase 3 Revise button
  const returnToPhase3Scenario = (location.state as any)?.returnToPhase3;
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [moveCompleted, setMoveCompleted] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  if (!opening) {
    return <div>Opening not found</div>;
  }

  const scenario = opening.practiceScenarios[currentScenarioIndex];

  const validateMove = (from: string, to: string): boolean => {
    const isValid = from === scenario.correctMove.from && to === scenario.correctMove.to;
    console.log('validateMove called:', { 
      from, 
      to, 
      expected: scenario.correctMove, 
      isValid,
      fromMatch: from === scenario.correctMove.from,
      toMatch: to === scenario.correctMove.to,
      scenarioId: scenario.id
    });
    return isValid;
  };

  const handleMove = (from: string, to: string) => {
    console.log('handleMove called:', { from, to });
    // Check if the move is correct
    const isCorrect = validateMove(from, to);
    
    if (isCorrect) {
      console.log('Move is correct!');
      setMoveCompleted(true);
      setShowIncorrect(false);
    } else {
      console.log('Move is incorrect');
      // Wrong move - show feedback but don't reset board
      setShowIncorrect(true);
      setMoveCompleted(false);
      // Hide the incorrect message after a short delay
      setTimeout(() => {
        setShowIncorrect(false);
      }, 1500);
    }
  };

  const handleNext = () => {
    // Check if there are more scenarios
    if (currentScenarioIndex < opening.practiceScenarios.length - 1) {
      // Move to next scenario
      setCurrentScenarioIndex(prev => prev + 1);
      setMoveCompleted(false);
      setShowIncorrect(false);
      setShowHint(false);
      setResetKey(prev => prev + 1);
    } else {
      // All scenarios completed
      navigate(`/phase3-intro/${openingId}`, {
        state:
          returnToPhase3Scenario !== undefined
            ? { resumeFromScenario: returnToPhase3Scenario }
            : undefined,
      });
    }
  };

  const handleBack = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(prev => prev - 1);
      setMoveCompleted(false);
      setShowIncorrect(false);
      setShowHint(false);
      setResetKey(prev => prev + 1);
    } else {
      navigate(`/phase1/${openingId}/${opening.steps.length}`);
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-8">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <p className="font-alatsi-regular text-[14px] text-[#85997c] text-center mb-2">
              Phase 2/3: Guided Practice ({currentScenarioIndex + 1}/{opening.practiceScenarios.length})
            </p>
            <h1 className="font-aleo-regular text-2xl text-center text-[#1e392e]">
              {opening.name}
            </h1>
          </div>

          <div className="bg-white border-2 border-[#9fbaa9] p-6 mb-4 rounded-[5px]">
            <p className="font-aleo-regular text-[#375c2b] mb-4">{scenario.description}</p>

            <ChessBoard
              key={`${openingId}-${currentScenarioIndex}-${resetKey}`}
              highlightedPieces={[scenario.correctMove.from]}
              highlightedSquares={scenario.highlightSquares}
              onMove={handleMove}
              disabled={moveCompleted}
              showHints={true}
              initialFen={scenario.initialFen}
              draggableSquares={[scenario.correctMove.from]}
              resetKey={resetKey}
              enforceTurns={true}
              flipped={openingId === "scandinavian"}
              validateMove={validateMove}
            />

            {showHint && (
              <div className="mt-4 p-3 bg-[#b3cabc] border-2 border-[#9fbaa9] rounded-[5px]">
                <p className="text-sm text-[#1e392e]">
                  <strong>Hint:</strong> {scenario.hint}
                </p>
              </div>
            )}

            {moveCompleted && (
              <div className="mt-4 p-3 bg-[#7cd89f] text-[#29573b] rounded-[5px]">
                <p className="font-alatsi-regular text-[14px]">Correct! You can now proceed to the next phase.</p>
              </div>
            )}

            {showIncorrect && (
              <div className="mt-4 p-3 bg-white border-2 border-[#9fbaa9] rounded-[5px]">
                <p className="font-alatsi-regular text-[14px] text-[#375c2b]">Not quite, please try again</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mb-3">
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-3 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
            >
              &lt; Go Back
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex-1 px-6 py-3 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={!moveCompleted}
            className="w-full px-6 py-3 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step &gt;
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}