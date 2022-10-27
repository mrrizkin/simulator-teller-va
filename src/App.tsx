import { useEffect } from "react";

import { useAppDispatch, useAppState } from "./context/App";

import HandleStep from "./components/HandleStep";
import Debugger from "./components/Debugger";
import Controller from "./components/Controller";
import Loading from "./components/Loading";
import Show from "./components/Show";

import { getCbsToken, getPaymentToken } from "./helpers/auth";

const App = () => {
  const { loading, debug } = useAppState();
  const { setLoading, setExternalToken, setInternalToken, toggleDebug } =
    useAppDispatch();

  useEffect(() => {
    getCbsToken()
      .then((res) => {
        getPaymentToken()
          .then((respond) => {
            setInternalToken(respond.data.token);
            setExternalToken(res.data.token);
            setLoading(false);
          })
          .catch((err) => {
            setTimeout(() => {
              console.warn(err);
              setExternalToken(res.data.token);
              alert("Initializing payment failed");
              setLoading(false);
            }, 1500);
          });
      })
      .catch((err) => {
        setTimeout(() => {
          console.warn(err);
          alert("Initializing cbs failed");
          setLoading(false);
        }, 1500);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Show when={loading} fallback={<HandleStep />}>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <Loading />
          <p>Hacktoberfest 2022</p>
          <p>Loading ...</p>
        </div>
      </Show>
      <div
        onClick={toggleDebug}
        className="fixed bottom-4 right-4 bg-black px-4 py-2 text-xs bg-opacity-40 flex gap-x-2 items-center cursor-pointer"
      >
        Debug
      </div>
      <Show when={debug}>
        <Debugger />
        <Controller />
      </Show>
    </div>
  );
};

export default App;
