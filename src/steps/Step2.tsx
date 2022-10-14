import { ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { useAppDispatch, useAppState } from "../context/AppContext";
import { Label, TextInput } from "../components/Input";

const Step2 = () => {
  const { jenisID, inquiryRequest, token } = useAppState();
  const {
    setNoVA,
    setNoIdentitas,
    next,
    back,
    setLoading,
    setInquiryResponse,
  } = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    jenisID === 1 ? setNoVA(e.target.value) : setNoIdentitas(e.target.value);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    jenisID === 1 ? setNoIdentitas("0") : setNoVA("0");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/external/inquiryVA`,
        inquiryRequest,
        { headers }
      )
      .then((res) => {
        setTimeout(() => {
          setInquiryResponse(res.data);
          setLoading(false);
          next();
        }, 1500);
      })
      .catch((e) => {
        setTimeout(() => {
          console.warn(e);
          setLoading(false);
        }, 1500);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      {jenisID === 1 ? (
        <>
          <Label>[No. Virtual Account]</Label>
          <TextInput value={inquiryRequest.nomorVA} onChange={handleChange} />
        </>
      ) : (
        <>
          <Label>[No. Identity]</Label>
          <TextInput
            value={inquiryRequest.nomorIdentitas}
            onChange={handleChange}
          />
        </>
      )}
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

export default Step2;
