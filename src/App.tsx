import { useEffect, useState } from "react";

import Loading from "./components/Loading";
import { useAppDispatch, useAppState } from "./context/AppContext";
import NotFound from "./steps/404";
import Debugger from "./components/Debugger";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

const App = () => {
  const { loading, debug } = useAppState();
  const { setLoading } = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
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
      {debug && <Debugger />}
    </div>
  );
};

const HandleStep = () => {
  const { step } = useAppState();
  switch (step) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    default:
      return <NotFound />;
  }
};

export default App;
