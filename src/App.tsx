import { useEffect } from "react";
import axios from "axios";

import { useAppDispatch, useAppState } from "./context/AppContext";

import NotFound from "./steps/404";
import Refresh from "./steps/Refresh";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";

import Debugger from "./components/Debugger";
import Controller from "./components/Controller";
import Loading from "./components/Loading";

const App = () => {
  const { loading, debug } = useAppState();
  const { setLoading, setExternalToken, setInternalToken, toggleDebug } =
    useAppDispatch();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_EXTERNAL}/external/auth`, {
        username: import.meta.env.VITE_USER_EXTERNAL,
        password: import.meta.env.VITE_PASS_EXTERNAL,
      })
      .then((res) => {
        axios
          .post(`${import.meta.env.VITE_API_INTERNAL}/auth`, {
            username: import.meta.env.VITE_USER_INTERNAL,
            password: import.meta.env.VITE_PASS_INTERNAL,
          })
          .then((respond) => {
            setTimeout(() => {
              setInternalToken(respond.data.token);
              setExternalToken(res.data.token);
              setLoading(false);
            }, 1500);
          })
          .catch((e) => {
            setTimeout(() => {
              console.warn(e);
              setExternalToken(res.data.token);
              alert("Initializing failed");
              setLoading(false);
            }, 1500);
          });
      })
      .catch((e) => {
        setTimeout(() => {
          console.warn(e);
          alert("Initializing failed");
          setLoading(false);
        }, 1500);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-y-4">
          <Loading />
          <p>Hacktoberfest 2022</p>
          <p>Loading ...</p>
        </div>
      ) : (
        <HandleStep />
      )}
      <div
        onClick={toggleDebug}
        className="fixed bottom-4 right-4 bg-black px-4 py-2 text-xs bg-opacity-40 flex gap-x-2 items-center cursor-pointer"
      >
        Debug
      </div>
      {debug && <Debugger />}
      {debug && <Controller />}
    </div>
  );
};

const HandleStep = () => {
  const { step, internalToken, externalToken } = useAppState();
  if (!externalToken) return <Refresh />;
  if (!internalToken) return <Refresh />;
  switch (step) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    case 4:
      return <Step4 />;
    case 5:
      return <Step5 />;
    default:
      return <NotFound />;
  }
};

export default App;
