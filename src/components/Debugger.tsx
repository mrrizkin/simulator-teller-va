import { useAppDispatch, useAppState } from "../context/AppContext";

const Debugger = () => {
  const state = useAppState();
  const { setLoading, next, back } = useAppDispatch();

  function triggerLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }
  return (
    <pre className="fixed top-4 left-4 bg-black p-4 text-xs">
      <h1 className="font-bold text-sm text-center">Debug Menu</h1>
      <code className="block mt-2 max-h-[300px] overflow-y-auto">
        {JSON.stringify(state, null, 2)}
      </code>
      <button
        className="w-full bg-white text-black px-2 py-1 mt-2"
        onClick={triggerLoading}
      >
        Trigger loading
      </button>
      <div className="flex gap-x-2 mt-2">
        <button onClick={back} className="flex-1 bg-white text-black px-2 py-1">
          back
        </button>
        <button onClick={next} className="flex-1 bg-white text-black px-2 py-1">
          next
        </button>
      </div>
    </pre>
  );
};

export default Debugger;
