import { useAppState } from "../context/AppContext";
import Status from "./Status";

const Step4 = () => {
  const { paymentVAResponse } = useAppState();
  return (
    <div className="p-8">
      <Status {...paymentVAResponse} />
    </div>
  );
};

export default Step4;
