const Loader = () => {
  return (
    <div
      id="loaderForAPICall"
      className="absolute invisible flex flex-row justify-center items-center w-full h-full top-0 left-0 z-10"
    >
      <div className="top-0 left-0 bg-slate-400 opacity-20 w-full h-full"></div>
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] absolute"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
