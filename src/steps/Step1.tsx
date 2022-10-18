import { useAppDispatch } from "../context/AppContext";

const Step1 = () => {
  const { next, setJenisID } = useAppDispatch();

  function jenis(type: number) {
    return function () {
      setJenisID(type);
      next();
    };
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Simulator Teller Virtual Account</h1>
      <div className="relative w-full flex justify-center gap-x-32 mt-24">
        <div
          onClick={jenis(1)}
          className="flex justify-center items-center cursor-pointer w-[200px] h-[200px] bg-blue-500 text-2xl rounded-xl p-2 hover:bg-gradient-to-r from-cyan-500 to-fuchsia-500 "
        >
          Virtual Account
        </div>
        <div
          onClick={jenis(2)}
          className="flex justify-center items-center cursor-pointer w-[200px] h-[200px] bg-indigo-600 text-2xl rounded-xl"
        >
          Identity
        </div>
      </div>
    </div>
  );
};

export default Step1;
