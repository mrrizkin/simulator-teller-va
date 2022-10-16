import { ChangeEvent, FormEvent, useState } from "react";

import { useAppDispatch, useAppState } from "../context/AppContext";
import { Label, TextInput } from "../components/Input";

const Step2 = () => {
  const [showFormDetail, setShowFormDetail] = useState(false);
  const { request, jenisID, inquiryRequest } = useAppState();
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

    request
      .post("/external/inquiryVA", inquiryRequest)
      .then((res: any) => {
        setTimeout(() => {
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

  function toggleFormDetail() {
    setShowFormDetail(!showFormDetail);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full">
      {jenisID === 1 ? (
        <>
          <Label className="text-xl">[No. Virtual Account]</Label>
          <TextInput
            value={inquiryRequest.nomorVA}
            onChange={handleChange}
            className="border-3 border-gray-500 p-2"
          />
        </>
      ) : (
        <>
          <Label className="text-xl">[No. Identity]</Label>
          <TextInput
            value={inquiryRequest.nomorIdentitas}
            onChange={handleChange}
            className="border-3 border-gray-500 p-2"
          />
        </>
      )}
      {showFormDetail && (
        <div className="text-gray-400">
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[Kode Instansi]</Label>
              <TextInput
                value={inquiryRequest.kodeInstansi}
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[Kode Produk]</Label>
              <TextInput
                value={inquiryRequest.kodeProduk}
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[Kode Kantor Tx]</Label>
              <TextInput
                value={inquiryRequest.kodeKantorTx}
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[Kode Bank]</Label>
              <TextInput
                value={inquiryRequest.kodeBank}
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[stan]</Label>
              <TextInput
                value={inquiryRequest.stan}
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[rrn]</Label>
              <TextInput
                value={inquiryRequest.rrn}
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
        </div>
      )}
      <div className="text-xs mt-4 flex gap-x-2 items-center">
        <input
          type="checkbox"
          name="showFormDetail"
          id="showFormDetail"
          onChange={toggleFormDetail}
          checked={showFormDetail}
        />
        <label htmlFor="showFormDetail">Show Form Detail</label>
      </div>
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
