import { useLocation, useNavigate, useParams } from "react-router";
import { openings } from "../data/openings";
import { MobileLayout } from "../components/MobileLayout";

export function Phase3Intro() {
  const { openingId } = useParams<{ openingId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const opening = openings.find((o) => o.id === openingId);
  const resumeFromScenario = (location.state as any)?.resumeFromScenario;

  if (!opening) {
    return <div>Opening not found</div>;
  }

  const handleRevise = () => {
    navigate(`/phase2/${openingId}`, {
      state: resumeFromScenario !== undefined ? { returnToPhase3: resumeFromScenario } : undefined,
    });
  };

  const handleContinue = () => {
    navigate(`/phase3/${openingId}`, {
      state: resumeFromScenario !== undefined ? { resumeFromScenario } : undefined,
    });
  };

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

          <div className="bg-white border-2 border-[#9fbaa9] p-6 mb-4 rounded-[5px]">
            <p className="font-aleo-regular text-[#375c2b] text-center">
              Good work! You are now ready to try out the {opening.name} on your own.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRevise}
              className="flex-1 px-6 py-3 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
            >
              Revise
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 px-6 py-3 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}