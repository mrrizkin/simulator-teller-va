import { useAppState } from "../context/AppContext";
import Status from "./Status";

const Step5 = () => {
  const { paymentVAResponse, fundTransferResponse } = useAppState();
  return (
    <div className="p-8">
      <Status {...paymentVAResponse} />
      <Status {...fundTransferResponse} />
    </div>
  );
};

export default Step5;
