import { useNavigate } from "react-router";
import { MobileLayout } from "../components/MobileLayout";
import { useProgress } from "../context/ProgressContext";

export function Completion() {
  const navigate = useNavigate();
  const { resetProgress } = useProgress();

  const handleDownloadCertificate = () => {
    // Create a simple text certificate
    const certificateText = `
CERTIFICATE OF COMPLETION

This certifies that you have successfully completed the

TOP 3 CHESS OPENINGS COURSE

You are now prepared for various opening game situations including:
- Scandinavian Defense
- London System
- Queen's Gambit

Date: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([certificateText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chess-openings-certificate.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartOver = () => {
    resetProgress();
    navigate("/");
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-[#9fbaa9] p-8 mb-6 rounded-[5px]">
            <h1 className="text-3xl mb-6 text-center text-[#1e392e]">
              Congratulations!
            </h1>

            <div className="border-2 border-[#9fbaa9] bg-[#b3cabc] p-8 mb-6 rounded-[5px]">
              <p className="text-center text-[#1e392e] mb-4">
                CERTIFICATE OF COMPLETION
              </p>
              <p className="text-center text-sm text-[#375c2b] mb-4">
                You have successfully completed the
              </p>
              <p className="font-aleo-regular text-center text-lg text-[#1e392e] mb-4">
                Top 3 Chess Openings Course
              </p>
              <p className="text-center text-xs text-[#85997c]">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            <p className="text-center text-[#375c2b] mb-6">
              You have learned the top 3 chess openings and are now ready for
              various beginning game situations.
            </p>

            <div className="space-y-3">
              <div className="border-l-4 border-[#2e5d40] pl-3">
                <p className="text-sm text-[#1e392e]">✓ Scandinavian Defense</p>
              </div>
              <div className="border-l-4 border-[#2e5d40] pl-3">
                <p className="text-sm text-[#1e392e]">✓ London System</p>
              </div>
              <div className="border-l-4 border-[#2e5d40] pl-3">
                <p className="text-sm text-[#1e392e]">✓ Queen's Gambit</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadCertificate}
            className="w-full px-6 py-4 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px] mb-3"
          >
            Download Certificate
          </button>

          <button
            onClick={handleStartOver}
            className="w-full px-6 py-4 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
          >
            Start Over
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}