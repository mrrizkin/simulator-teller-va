import { useAppDispatch } from "../context/AppContext";

const Step1 = () => {
  const { next, setJenisID } = useAppDispatch();

  function jenis1() {
    next();
    setJenisID(1);
  }

  function jenis2() {
    next();
    setJenisID(2);
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Simulator Teller Virtual Account</h1>
      <div className="relative w-full flex justify-center gap-x-32 mt-24">
        <div
          onClick={jenis1}
          className="flex justify-center items-center cursor-pointer w-[200px] h-[200px] bg-cyan-500 text-2xl rounded-xl"
        >
          Virtual Account
        </div>
        <div
          onClick={jenis2}
          className="flex justify-center items-center cursor-pointer w-[200px] h-[200px] bg-indigo-600 text-2xl rounded-xl"
        >
          Identitas
        </div>
      </div>
    </div>
  );
};

export default Step1;
