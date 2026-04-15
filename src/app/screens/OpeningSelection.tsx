import { useState } from "react";
import { useNavigate } from "react-router";
import { openings } from "../data/openings";
import { MobileLayout } from "../components/MobileLayout";
import { useProgress } from "../context/ProgressContext";
import { OpeningThumbnail } from "../components/OpeningThumbnail";

export function OpeningSelection() {
  const navigate = useNavigate();
  const [hoveredOpening, setHoveredOpening] = useState<string | null>(null);
  const { completedOpenings } = useProgress();

  const handleSelectOpening = (openingId: string) => {
    navigate(`/opening/${openingId}`);
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-12">
        <div className="w-full max-w-md">
          <h1 className="text-2xl mb-2 text-center text-[#1e392e]">
            Top 3 Chess Openings
          </h1>
          <p className="text-center text-[#85997c] mb-8">
            Select the opening that speaks most to you
          </p>

          <div className="space-y-8">
            {openings.map((opening) => {
              const isCompleted = completedOpenings.includes(opening.id);
              return (
                <button
                  key={opening.id}
                  onClick={() => handleSelectOpening(opening.id)}
                  onMouseEnter={() => setHoveredOpening(opening.id)}
                  onMouseLeave={() => setHoveredOpening(null)}
                  className={`w-full block appearance-none p-6 border-2 border-[#9fbaa9] bg-white text-left rounded-[5px] relative transform-gpu transition-all duration-200 ${
                    hoveredOpening === opening.id
                      ? "bg-[#b3cabc] scale-[1.02] shadow-lg z-10"
                      : ""
                  }`}
                >
                  {isCompleted && (
                    <div className="absolute top-2 right-2 z-10 w-8 h-8 bg-[#2e5d40] text-white flex items-center justify-center text-xl rounded-[4px]">
                      ✓
                    </div>
                  )}
                  <div className="mb-4 flex justify-center">
                    <OpeningThumbnail opening={opening} className="w-full max-w-[300px]" />
                  </div>
                  <h2 className="font-aleo-regular text-2xl mb-2 text-[#1e392e]">{opening.name}</h2>
                  <p className="text-sm text-[#5d7970]">Best for: {opening.bestFor}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}