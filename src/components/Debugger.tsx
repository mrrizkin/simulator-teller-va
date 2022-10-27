import { useState } from "react";
import { useAppState } from "../context/App";

const Debugger = () => {
  const state = useAppState();
  const [show, setShow] = useState(true);

  function toggleShow() {
    setShow(!show);
  }

  return (
    <pre className="fixed top-4 left-4 bg-black p-4 text-xs bg-opacity-40">
      <h1 className="font-bold text-sm flex items-center justify-center">
        <input onChange={toggleShow} checked={show} type="checkbox" /> Debug
        State
      </h1>
      {show && (
        <code className="block mt-2 max-h-[400px] max-w-[400px] overflow-y-auto">
          {JSON.stringify(state, null, 2)}
        </code>
      )}
    </pre>
  );
};

export default Debugger;
