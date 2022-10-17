import { useAppState } from "../context/AppContext";
import Status from "./Status";

const Step5 = () => {
  const { paymentVAResponse } = useAppState();
  return (
    <div className="p-8">
      <Status {...paymentVAResponse} />
    </div>
  );
};

export default Step5;
