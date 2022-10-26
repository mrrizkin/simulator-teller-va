import {
  ResponseStatus,
  useAppState,
  useAppDispatch,
} from "../context/AppContext";
import { z } from "zod";

const Status = (props: z.infer<typeof ResponseStatus>) => {
  const { step, maxStep } = useAppState();
  const { back, setStep } = useAppDispatch();

  const { status, message } = props;

  function handleNext() {
    setStep(3);
  }

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-xl">
        {status.length > 0 || message.length > 0 ? (
          <>
            status code: <span>{status}</span>,{" "}
            <span
              className={status === "00" ? "text-green-500" : "text-red-500"}
            >
              {message}
            </span>
          </>
        ) : (
          "Oops! Something went wrong"
        )}
      </h1>
      {step === maxStep ? (
        <div>
          <button
            type="button"
            onClick={back}
            className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 btn-hacktober outline-none focus:border-blue-500"
          >
            Go Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white rounded-md mt-4 px-8 py-2 btn-hacktober outline-none focus:border-blue-500"
          >
            New Transaction
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={back}
          className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 btn-hacktober outline-none focus:border-blue-500"
        >
          Go Back
        </button>
      )}
    </div>
  );
};

export default Status;
