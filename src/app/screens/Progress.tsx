import { useNavigate } from "react-router";
import { openings } from "../data/openings";
import { MobileLayout } from "../components/MobileLayout";
import { useProgress } from "../context/ProgressContext";
import { OpeningThumbnail } from "../components/OpeningThumbnail";

export function Progress() {
  const navigate = useNavigate();
  const { completedOpenings } = useProgress();

  const allCompleted = completedOpenings.length === openings.length;

  const handleSelectOpening = (openingId: string) => {
    navigate(`/opening/${openingId}`);
  };

  const handleFinish = () => {
    navigate("/completion");
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-12">
        <div className="w-full max-w-md">
          <h1 className="text-2xl mb-2 text-center text-[#1e392e]">
            Great Progress!
          </h1>
          <p className="text-center text-[#85997c] mb-8">
            {allCompleted
              ? "You've completed all openings! Ready to finish?"
              : "Select another opening to continue learning"}
          </p>

          <div className="space-y-4 mb-6">
            {openings.map((opening) => {
              const isCompleted = completedOpenings.includes(opening.id);
              return (
                <button
                  key={opening.id}
                  onClick={() => !isCompleted && handleSelectOpening(opening.id)}
                  disabled={isCompleted}
                  className={`w-full block appearance-none p-6 border-2 border-[#9fbaa9] text-left rounded-[5px] relative transform-gpu transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#b3cabc] cursor-default opacity-75"
                      : "bg-white hover:bg-[#dce3d8] hover:scale-[1.02] hover:shadow-lg hover:z-10"
                  }`}
                >
                  {isCompleted && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#2e5d40] text-white flex items-center justify-center text-xl">
                      ✓
                    </div>
                  )}
                  <div className="mb-4 flex justify-center">
                    <OpeningThumbnail opening={opening} className="w-full max-w-[300px]" />
                  </div>
                  <h2 className="font-aleo-regular text-xl mb-2 text-[#1e392e]">{opening.name}</h2>
                  <p className="text-sm text-[#85997c]">
                    {isCompleted ? "Completed" : `Best for: ${opening.bestFor}`}
                  </p>
                </button>
              );
            })}
          </div>

          {allCompleted && (
            <button
              onClick={handleFinish}
              className="w-full px-6 py-4 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px]"
            >
              Finish Course &gt;
            </button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
