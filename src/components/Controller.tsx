import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppState, InquiryResponse } from "../context/App";

const Controller = () => {
  const { setLoading, reset, next, back, setToken, setInquiryResponse } =
    useAppDispatch();
  const { step, maxStep, loading } = useAppState();

  const [dummyToken, setDummyToken] = useState("");
  const [dummyInquiryResponse, setDummyInquiryResponse] = useState("");
  const [show, setShow] = useState(true);

  function triggerLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }

  function assignDummyToken() {
    setToken(dummyToken);
  }

  function assignDummyInquiryResponse() {
    const dummyResponse = InquiryResponse.parse(
      JSON.parse(dummyInquiryResponse)
    );
    setInquiryResponse(dummyResponse);
  }

  function handleTokenChange(e: ChangeEvent<HTMLInputElement>) {
    setDummyToken(e.target.value);
  }

  function handleInquiryResponseChange(e: ChangeEvent<HTMLInputElement>) {
    setDummyInquiryResponse(e.target.value);
  }

  function toggleShow() {
    setShow(!show);
  }

  return (
    <>
      <pre className="fixed top-4 right-4 bg-black p-4 text-xs bg-opacity-40">
        <h1 className="font-bold text-sm flex items-center justify-center">
          <input onChange={toggleShow} checked={show} type="checkbox" /> Control
          Menu
        </h1>
        {show && (
          <div className="flex flex-col">
            <button
              className={`w-full bg-white text-black px-2 py-1 mt-2 ${
                loading && "opacity-50"
              }`}
              onClick={triggerLoading}
              disabled={loading}
            >
              Trigger loading
            </button>
            <button
              className="w-full bg-white text-black px-2 py-1 mt-2"
              onClick={reset}
            >
              Reset
            </button>
            <div className="flex gap-x-2 mt-2">
              <button
                onClick={back}
                className={`flex-1 bg-white text-black px-2 py-1 ${
                  step === 1 && "opacity-50"
                }`}
                disabled={step === 1}
              >
                back
              </button>
              <button
                onClick={next}
                className={`flex-1 bg-white text-black px-2 py-1 ${
                  step === maxStep && "opacity-50"
                }`}
                disabled={step === maxStep}
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
              onClick={assignDummyToken}
            >
              Assign Token
            </button>
            <input
              type="text"
              className="block my-2 py-1 px-2 text-black outline-none w-full"
              placeholder="inquiry json response"
              value={dummyInquiryResponse}
              onChange={handleInquiryResponseChange}
            />
            <button
              className="w-full bg-white text-black px-2 py-1"
              onClick={assignDummyInquiryResponse}
            >
              Assign Inquiry Response
            </button>
          </div>
        )}
      </pre>
    </>
  );
};

export default Controller;
