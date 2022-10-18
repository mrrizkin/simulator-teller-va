import { useAppState } from "../context/AppContext";
import Status from "./Status";

const Step5 = () => {
  const { paymentVAResponse, fundTransferResponse } = useAppState();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Payment VA</h1>
      <Status {...paymentVAResponse} />
      <hr className="my-8" />
      <h1 className="text-3xl font-bold text-center my-8">Fund Transfer</h1>
      <Status {...fundTransferResponse} />
    </div>
  );
};

export default Step5;
