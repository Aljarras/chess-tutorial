import { useNavigate, useParams } from "react-router";
import { openings } from "../data/openings";
import { MobileLayout } from "../components/MobileLayout";

export function OpeningOverview() {
  const { openingId } = useParams<{ openingId: string }>();
  const navigate = useNavigate();
  const openingVideoLinks: Record<string, string> = {
    london: "https://youtu.be/49H728S_VjM?si=q09BlXl2hAf-LmxU",
    "queens-gambit": "https://youtu.be/mtsabsZ4wG4?si=MFeyV0K8YMnlyodz",
    scandinavian: "https://youtu.be/A2J2OW99lGU?si=IX5iUezrHaw6Grk3",
  };
  
  const opening = openings.find((o) => o.id === openingId);
  const videoOverviewLink = opening ? openingVideoLinks[opening.id] : undefined;
  const videoEmbedLink = videoOverviewLink
    ? videoOverviewLink
        .replace("youtu.be/", "www.youtube.com/embed/")
        .replace(/\?.*$/, "")
    : undefined;

  if (!opening) {
    return <div>Opening not found</div>;
  }

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-8">
        <div className="w-full max-w-md">
          <h1 className="font-aleo-regular text-2xl mb-6 text-center text-[#1e392e]">
            {opening.name}
          </h1>

          <div className="bg-white border-2 border-[#9fbaa9] p-6 mb-6 rounded-[5px]">
            <div className="border-2 border-[#9fbaa9] bg-[#b3cabc] h-48 mb-4 rounded-[5px] overflow-hidden">
              {videoEmbedLink ? (
                <iframe
                  src={videoEmbedLink}
                  title={`${opening.name} video overview`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <span className="text-[#5d7970] text-sm">[Video Overview]</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-[#85997c] mb-1">Best For</h3>
                <p className="text-[#1e392e]">{opening.bestFor}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-[#85997c] mb-1">Overview</h3>
                <p className="text-[#375c2b]">{opening.description}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/select-opening")}
              className="flex-1 px-6 py-4 bg-white text-[#2e5d40] border-2 border-[#9fbaa9] rounded-[5px]"
            >
              Choose Different Opening
            </button>
            <button
              onClick={() => navigate(`/phase1/${openingId}/1`)}
              className="flex-1 px-6 py-4 bg-[#2e5d40] text-white border-2 border-[#9fbaa9] rounded-[5px]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}