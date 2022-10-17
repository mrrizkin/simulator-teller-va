import { ChangeEvent, FormEvent, useEffect } from "react";
import { useAppState, useAppDispatch } from "../context/AppContext";
import { TextInput, Label } from "../components/Input";
import axios from "axios";

const Step4 = () => {
  const { modeTransaksi, paymentVARequest, token } = useAppState();
  const {
    next,
    back,
    setPaymentVARequest,
    setInquiryResponse,
    setPaymentVAResponse,
    setLoading,
  } = useAppDispatch();

  useEffect(() => {
    if (modeTransaksi === "1") {
      setLoading(true);
      makeRequest();
    }
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPaymentVARequest({
      ...paymentVARequest,
      nominalVA: e.currentTarget.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (parseInt(paymentVARequest.nominalVA) <= 0) {
      alert("Nominal VA should be greater than 0");
      return;
    }
    if (paymentVARequest.nominalVA === "") {
      alert("Nominal VA can't be empty");
    }

    setLoading(true);
    makeRequest();
  }

  function makeRequest() {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/external/paymentVA`,
        paymentVARequest,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res: any) => {
        setTimeout(() => {
          setPaymentVAResponse(res.data);
          setInquiryResponse(res.data);
          setLoading(false);
          next();
        }, 1500);
      })
      .catch((e: any) => {
        setTimeout(() => {
          console.warn(e);
          setLoading(false);
        }, 1500);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full">
      <Label className="text-xl">[Input Nominal]</Label>
      <TextInput
        value={paymentVARequest.nominalVA}
        onChange={handleChange}
        className="border-3 border-gray-500 p-2"
      />
      <button
        type="button"
        onClick={back}
        className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
      >
        Back
      </button>
      <input
        type="submit"
        value="Next"
        className="bg-blue-500 text-white rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
      />
    </form>
  );
};

export default Step4;
