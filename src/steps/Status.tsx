import { ResponseStatus, useAppState, useAppDispatch } from "../context/App";
import { z } from "zod";
import HackButton from "../components/HackButton";

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
          <HackButton
            type="button"
            onClick={back}
            className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
          >
            Go Back
          </HackButton>

          <HackButton
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
          >
            New Transaction
          </HackButton>
        </div>
      ) : (
        <HackButton
          type="button"
          onClick={back}
          className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
        >
          Go Back
        </HackButton>
      )}
    </div>
  );
};

export default Status;
