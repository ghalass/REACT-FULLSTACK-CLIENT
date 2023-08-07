import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <div className="my-4 d-flex">
      <Spinner animation="grow" variant="info" />
      <div className="mt-1 ml-2">Loading...</div>
    </div>
  );
}

export default LoadingSpinner;
