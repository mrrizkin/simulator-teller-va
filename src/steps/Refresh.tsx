const Refresh = () => {
  function refresh() {
    window.location.reload();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p>Looks, like something when wrong</p>
      <p>
        Please,{" "}
        <span onClick={refresh} className="italic underline cursor-pointer">
          refresh
        </span>{" "}
        this page to try again
      </p>
    </div>
  );
};

export default Refresh;
