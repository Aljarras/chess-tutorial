import { useState } from "react";
import { useNavigate } from "react-router";
import { openings } from "../data/openings";
import { MobileLayout } from "../components/MobileLayout";
import { useProgress } from "../context/ProgressContext";

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

          <div className="space-y-4">
            {openings.map((opening) => {
              const isCompleted = completedOpenings.includes(opening.id);
              return (
                <button
                  key={opening.id}
                  onClick={() => handleSelectOpening(opening.id)}
                  onMouseEnter={() => setHoveredOpening(opening.id)}
                  onMouseLeave={() => setHoveredOpening(null)}
                  className={`w-full p-6 border-2 border-[#9fbaa9] bg-white text-left transition-all rounded-[5px] relative ${
                    hoveredOpening === opening.id
                      ? "bg-[#b3cabc] transform scale-105"
                      : ""
                  }`}
                >
                  {isCompleted && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#2e5d40] text-white flex items-center justify-center text-xl">
                      ✓
                    </div>
                  )}
                  <div className="border-2 border-[#9fbaa9] bg-[#b3cabc] h-32 mb-4 flex items-center justify-center rounded-[5px]">
                    <span className="text-[#5d7970] text-sm">
                      [{opening.name} Thumbnail]
                    </span>
                  </div>
                  <h2 className="font-aleo-regular text-xl mb-2 text-[#1e392e]">{opening.name}</h2>
                  <p className="text-sm text-[#85997c]">Best for: {opening.bestFor}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}