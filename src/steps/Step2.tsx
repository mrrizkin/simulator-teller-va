import axios from "axios";
import { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppState } from "../context/AppContext";

const Step2 = () => {
  const { jenisID, noIdentitas, token } = useAppState();
  const { setNoIdentitas, next, back, setData, setLoading } = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNoIdentitas(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/external/inquiryVA`,
        {
          nomorVA: jenisID == 1 ? noIdentitas : "0",
          nomorIdentitas: jenisID == 2 ? noIdentitas : "0",
          kodeInstansi: "0",
          kodeProduk: "0",
          kodeKantorTx: "0",
          kodeBank: "0",
          stan: "210595",
          rrn: "110480000001",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
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
      <label htmlFor="name" className="text-xl block font-bold mb-4">
        {jenisID == 1 ? "[No. Virtual Account]" : "[No. Identity]"}
      </label>
      <input
        type="text"
        value={noIdentitas}
        onChange={handleChange}
        className="block bg-transparent border-3 border-gray-500 rounded-md p-2 w-[300px] outline-none focus:border-blue-500"
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

export default Step2;
