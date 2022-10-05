import globe from "./assets/globe.svg";
import h from "./assets/h.svg";

const App = () => {
  return (
    <div className="text-center">
      <header className="bg-[#282c34] text-white dyn-font-size min-h-screen flex flex-col justify-center items-center">
        <div className="flex items-center relative mx-auto mb-[24px] w-[224px] h-[224px]">
          <img src={globe} className="absolute w-full glow" alt="logo" />
          <img src={h} className="mx-auto w-1/2 glow" alt="logo" />
        </div>
        <p>Hacktoberfest 2022</p>
      </header>
    </div>
  );
};

export default App;
