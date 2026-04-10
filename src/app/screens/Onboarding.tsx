import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileLayout } from "../components/MobileLayout";

export function Onboarding() {
  const navigate = useNavigate();
  const [hasChessBoard, setHasChessBoard] = useState<boolean | null>(null);
  const [hasBasicKnowledge, setHasBasicKnowledge] = useState<boolean | null>(
    null
  );

  const handleContinue = () => {
    if (hasChessBoard === null || hasBasicKnowledge === null) return;

    if (!hasBasicKnowledge) {
      // Show recommendation
      alert(
        "We recommend watching tutorials on how each chess piece moves before continuing."
      );
      return;
    }

    navigate("/select-opening");
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl mb-8 text-center text-[#1e392e]">
            Chess Openings Tutorial
          </h1>

          <div className="bg-white border-2 border-[#9fbaa9] p-6 mb-6 rounded-[5px]">
            <h2 className="text-xl mb-4 text-[#1e392e]">Before we begin...</h2>

            <div className="space-y-6">
              <div>
                <p className="mb-3 text-[#375c2b]">
                  Do you have access to a chess board (virtual or physical)?
                </p>
                <p className="text-sm mb-3 text-[#85997c]">
                  Examples: LiChess.org, Chess.com, or a physical board
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setHasChessBoard(true)}
                    className={`flex-1 px-4 py-3 border-2 border-[#9fbaa9] rounded-[5px] ${
                      hasChessBoard === true
                        ? "bg-[#2e5d40] text-white"
                        : "bg-white text-[#2e5d40]"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setHasChessBoard(false)}
                    className={`flex-1 px-4 py-3 border-2 border-[#9fbaa9] rounded-[5px] ${
                      hasChessBoard === false
                        ? "bg-[#2e5d40] text-white"
                        : "bg-white text-[#2e5d40]"
                    }`}
                  >
                    No
                  </button>
                </div>
                {hasChessBoard === false && (
                  <p className="mt-3 text-sm text-[#85997c]">
                    Don't worry! We'll provide a virtual board in this module.
                  </p>
                )}
              </div>

              <div>
                <p className="mb-3 text-[#375c2b]">
                  Do you know how all the chess pieces move?
                </p>
                <p className="text-sm mb-3 text-[#85997c]">
                  Basic knowledge required: piece movement and ~150 Elo rating
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setHasBasicKnowledge(true)}
                    className={`flex-1 px-4 py-3 border-2 border-[#9fbaa9] rounded-[5px] ${
                      hasBasicKnowledge === true
                        ? "bg-[#2e5d40] text-white"
                        : "bg-white text-[#2e5d40]"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setHasBasicKnowledge(false)}
                    className={`flex-1 px-4 py-3 border-2 border-[#9fbaa9] rounded-[5px] ${
                      hasBasicKnowledge === false
                        ? "bg-[#2e5d40] text-white"
                        : "bg-white text-[#2e5d40]"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={hasChessBoard === null || hasBasicKnowledge === null}
            className="w-full px-6 py-4 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}