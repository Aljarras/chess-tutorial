import { useNavigate, useParams } from "react-router";
import { openings } from "../data/openings";
import { MobileLayout } from "../components/MobileLayout";

export function Phase1Step() {
  const { openingId, step } = useParams<{ openingId: string; step: string }>();
  const navigate = useNavigate();
  
  const opening = openings.find((o) => o.id === openingId);
  const currentStep = opening?.steps[parseInt(step || "1") - 1];
  const stepNumber = parseInt(step || "1");
  const totalSteps = opening?.steps.length || 0;

  if (!opening || !currentStep) {
    return <div>Opening or step not found</div>;
  }

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
            
            <div className="border-2 border-[#9fbaa9] bg-[#b3cabc] h-64 mb-4 flex items-center justify-center rounded-[5px]">
              <span className="text-[#5d7970] text-sm">[GIF: {currentStep.notation}]</span>
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