import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Chess } from "chess.js";
import { openings } from "../data/openings";
import { ChessBoard } from "../components/ChessBoard";
import { MobileLayout } from "../components/MobileLayout";

type AnimationStep = {
  initialFen: string;
  from: string;
  to: string;
};

const STEP_ANIMATIONS: Record<string, Record<number, AnimationStep>> = {
  scandinavian: {
    1: {
      initialFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
      from: "d7",
      to: "d5",
    },
    2: {
      initialFen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2",
      from: "e4",
      to: "d5",
    },
    3: {
      initialFen: "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2",
      from: "d8",
      to: "d5",
    },
    4: {
      initialFen: "rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3",
      from: "d5",
      to: "e5",
    },
  },
  london: {
    1: {
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      from: "d2",
      to: "d4",
    },
    2: {
      initialFen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      from: "c1",
      to: "f4",
    },
    3: {
      initialFen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3",
      from: "e2",
      to: "e3",
    },
    4: {
      initialFen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4",
      from: "g1",
      to: "f3",
    },
  },
  "queens-gambit": {
    1: {
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      from: "d2",
      to: "d4",
    },
    2: {
      initialFen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
      from: "d7",
      to: "d5",
    },
    3: {
      initialFen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      from: "c2",
      to: "c4",
    },
    4: {
      initialFen: "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
      from: "b1",
      to: "c3",
    },
  },
};

export function Phase1Step() {
  const { openingId, step } = useParams<{ openingId: string; step: string }>();
  const navigate = useNavigate();
  
  const opening = openings.find((o) => o.id === openingId);
  const currentStep = opening?.steps[parseInt(step || "1") - 1];
  const stepNumber = parseInt(step || "1");
  const totalSteps = opening?.steps.length || 0;
  const [showAfterMove, setShowAfterMove] = useState(false);
  const [loopResetKey, setLoopResetKey] = useState(0);

  if (!opening || !currentStep) {
    return <div>Opening or step not found</div>;
  }

  const animationStep = STEP_ANIMATIONS[opening.id]?.[stepNumber];

  const afterMoveFen = useMemo(() => {
    if (!animationStep) {
      return null;
    }

    const game = new Chess(animationStep.initialFen);
    const move = game.move({
      from: animationStep.from,
      to: animationStep.to,
      promotion: "q",
    });

    return move ? game.fen() : null;
  }, [animationStep]);

  useEffect(() => {
    setShowAfterMove(false);
    setLoopResetKey(0);

    if (!animationStep || !afterMoveFen) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setShowAfterMove((prev) => !prev);
      setLoopResetKey((prev) => prev + 1);
    }, 1200);

    return () => window.clearInterval(intervalId);
  }, [animationStep, afterMoveFen]);

  const handleNext = () => {
    if (stepNumber < totalSteps) {
      navigate(`/phase1/${openingId}/${stepNumber + 1}`);
    } else {
      // Move to phase 2
      navigate(`/phase2/${openingId}`);
    }
  };

  const handleBack = () => {
    if (stepNumber > 1) {
      navigate(`/phase1/${openingId}/${stepNumber - 1}`);
    } else {
      navigate(`/opening/${openingId}`);
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-8">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <p className="font-alatsi-regular text-[14px] text-[#85997c] text-center mb-2">
              Phase 1/3: First Exposure
            </p>
            <h1 className="font-aleo-regular text-2xl text-center text-[#1e392e]">
              {opening.name}
            </h1>
            <p className="text-center text-[#85997c] mt-1">
              Step {stepNumber} of {totalSteps}
            </p>
          </div>

          <div className="bg-white border-2 border-[#9fbaa9] p-6 mb-6 rounded-[5px]">
            <h2 className="font-aleo-regular text-xl mb-4 text-[#1e392e]">{currentStep.title}</h2>
            
            <div className="border-2 border-[#9fbaa9] bg-[#b3cabc] p-3 mb-4 rounded-[5px]">
              {animationStep && afterMoveFen ? (
                <>
                  <ChessBoard
                    key={`${openingId}-${stepNumber}-${loopResetKey}`}
                    initialFen={showAfterMove ? afterMoveFen : animationStep.initialFen}
                    highlightedPieces={[showAfterMove ? animationStep.to : animationStep.from]}
                    highlightedSquares={[animationStep.from, animationStep.to]}
                    disabled={true}
                    showHints={true}
                    enforceTurns={false}
                    resetKey={loopResetKey}
                    flipped={openingId === "scandinavian"}
                  />
                  <p className="text-[#5d7970] text-xs mt-3 text-center">
                    Looping move demo: {animationStep.from} to {animationStep.to}
                  </p>
                </>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <span className="text-[#5d7970] text-sm">Animation unavailable for this step</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm text-[#85997c] mb-1">Move</h3>
                <p className="text-[#1e392e] font-mono">{currentStep.notation}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-[#85997c] mb-1">Instructions</h3>
                <p className="font-aleo-regular text-[#375c2b]">{currentStep.description}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-4 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
            >
              &lt; Go Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-4 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px]"
            >
              Next Step &gt;
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}