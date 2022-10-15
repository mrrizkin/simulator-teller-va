import { ResponseStatus, useAppDispatch } from "../context/AppContext";
import { z } from "zod";

const Status = (props: z.infer<typeof ResponseStatus>) => {
  const { back } = useAppDispatch();

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-xl">
        status code: <span>{props.status}</span>, <span>{props.message}</span>
      </h1>
      <button
        type="button"
        onClick={back}
        className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
      >
        Go Back
      </button>
    </div>
  );
};

export default Status;
