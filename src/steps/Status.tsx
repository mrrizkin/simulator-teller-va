import { z } from "zod";

import { ResponseStatus, useAppState, useAppDispatch } from "../context/App";

import HackButton from "../components/HackButton";
import Show from "../components/Show";

const Status = (props: z.infer<typeof ResponseStatus>) => {
  const { step, maxStep } = useAppState();
  const { reset } = useAppDispatch();

  const { status, message } = props;

  function handleNext() {
    reset();
  }

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-xl">
        <Show
          when={status.length > 0 || message.length > 0}
          fallback={"Oops! Something went wrong"}
        >
          status code: <span>{status}</span>,{" "}
          <span className={status === "00" ? "text-green-500" : "text-red-500"}>
            {message}
          </span>
        </Show>
      </h1>
      <Show
        when={step === maxStep}
        fallback={
          <HackButton
            type="button"
            onClick={reset}
            className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
          >
            Reset
          </HackButton>
        }
      >
        <div>
          <HackButton
            type="button"
            onClick={reset}
            className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
          >
            Reset
          </HackButton>

          <HackButton
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
          >
            New Transaction
          </HackButton>
        </div>
      </Show>
    </div>
  );
};

export default Status;
