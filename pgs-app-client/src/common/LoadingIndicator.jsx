import React from "react";

const LoadingIndicator = () => {
  return (
    <>
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

export default LoadingIndicator;
