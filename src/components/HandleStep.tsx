import { useAppState } from "../context/App";

import NotFound from "../steps/404";
import Refresh from "../steps/Refresh";
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/Step4";
import Step5 from "../steps/Step5";

const HandleStep = () => {
  const { step, internalToken, externalToken } = useAppState();
  if (!externalToken) return <Refresh />;
  if (!internalToken) return <Refresh />;
  switch (step) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    case 4:
      return <Step4 />;
    case 5:
      return <Step5 />;
    default:
      return <NotFound />;
  }
};

export default HandleStep;
