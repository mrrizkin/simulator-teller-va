import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../context/AppContext";

const Controller = () => {
  const { setLoading, next, back, setToken } = useAppDispatch();
  const [dummyToken, setDummyToken] = useState("");
  const [show, setShow] = useState(true);

  function triggerLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }

  function asignDummyToken() {
    setToken(dummyToken);
  }

  function handleTokenChange(e: ChangeEvent<HTMLInputElement>) {
    setDummyToken(e.target.value);
  }

  function toggleShow() {
    setShow(!show);
  }

  return (
    <pre className="fixed top-4 right-4 bg-black p-4 text-xs bg-opacity-40">
      <h1 className="font-bold text-sm flex items-center justify-center">
        <input onChange={toggleShow} checked={show} type="checkbox" /> Control
        Menu
      </h1>
      {show && (
        <div>
          <button
            className="w-full bg-white text-black px-2 py-1 mt-2"
            onClick={triggerLoading}
          >
            Trigger loading
          </button>
          <div className="flex gap-x-2 mt-2">
            <button
              onClick={back}
              className="flex-1 bg-white text-black px-2 py-1"
            >
              back
            </button>
            <button
              onClick={next}
              className="flex-1 bg-white text-black px-2 py-1"
            >
              next
            </button>
          </div>
          <input
            type="text"
            className="block my-2 py-1 px-2 text-black outline-none w-full"
            placeholder="token"
            value={dummyToken}
            onChange={handleTokenChange}
          />
          <button
            className="w-full bg-white text-black px-2 py-1"
            onClick={asignDummyToken}
          >
            Assign Token
          </button>
        </div>
      )}
    </pre>
  );
};

export default Controller;
