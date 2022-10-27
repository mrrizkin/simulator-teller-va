import { useAppDispatch } from "../context/App";

const NotFound = () => {
  const { back } = useAppDispatch();

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={back}>Go Back</button>
    </div>
  );
};

export default NotFound;
