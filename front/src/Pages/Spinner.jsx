const Spinner = () => {
    return (
      <div className="flex justify-center items-center my-10 h-full">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-red-600 rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };
  
  export default Spinner;
  
