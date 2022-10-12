import { useAppDispatch, useAppState } from "../context/AppContext";

const Step2 = () => {
  const { noIdentitas } = useAppState();
  const { setNoIdentitas } = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNoIdentitas(e.target.value);
  }

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={noIdentitas}
        onChange={handleChange}
      />
    </div>
  );
};

export default Step2;
