import React from "react";
import { Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
  return (
    <div className="d-flex my-4">
      <Spinner
        className="mt-1 mx-1"
        animation="grow"
        variant="info"
        size="sm"
      />
      <div className="">Loading...</div>
    </div>
  );
};
