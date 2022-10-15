import {
  useAppState,
  InquiryResponse,
  ResponseStatus,
} from "../context/AppContext";

import Status from "./Status";

const Step3 = () => {
  const { inquiryResponse } = useAppState();

  let response = InquiryResponse.safeParse(inquiryResponse);
  let failedResponse = ResponseStatus.safeParse(inquiryResponse);

  return (
    <div className="p-8">
      <pre>
        {response.success
          ? JSON.stringify(response.data, null, 2)
          : failedResponse.success && <Status {...failedResponse.data} />}
      </pre>
    </div>
  );
};

export default Step3;
