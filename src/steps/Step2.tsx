import { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppState } from "../context/AppContext";

const Step2 = () => {
  const { noIdentitas } = useAppState();
  const { setNoIdentitas, next } = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNoIdentitas(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    next();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="text-xl block font-bold">
        No. Identitas
      </label>
      <input
        type="text"
        value={noIdentitas}
        onChange={handleChange}
        className="bg-transparent border-3 border-gray-500 rounded-md p-2 w-[300px] outline-none focus:border-blue-500"
      />
    </form>
  );
};

export default Step2;
