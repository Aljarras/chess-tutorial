import { createHashRouter } from "react-router";
import { Onboarding } from "./screens/Onboarding";
import { OpeningSelection } from "./screens/OpeningSelection";
import { OpeningOverview } from "./screens/OpeningOverview";
import { Phase1Step } from "./screens/Phase1Step";
import { Phase2Practice } from "./screens/Phase2Practice";
import { Phase3Intro } from "./screens/Phase3Intro";
import { Phase3Test } from "./screens/Phase3Test";
import { Progress } from "./screens/Progress";
import { Completion } from "./screens/Completion";

export const router = createHashRouter([
  {
    path: "/",
    Component: Onboarding,
  },
  {
    path: "/select-opening",
    Component: OpeningSelection,
  },
  {
    path: "/opening/:openingId",
    Component: OpeningOverview,
  },
  {
    path: "/phase1/:openingId/:step",
    Component: Phase1Step,
  },
  {
    path: "/phase2/:openingId",
    Component: Phase2Practice,
  },
  {
    path: "/phase3-intro/:openingId",
    Component: Phase3Intro,
  },
  {
    path: "/phase3/:openingId",
    Component: Phase3Test,
  },
  {
    path: "/progress",
    Component: Progress,
  },
  {
    path: "/completion",
    Component: Completion,
  },
]);