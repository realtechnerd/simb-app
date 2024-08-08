import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorMessage(props) {
  return (
    <Alert variant="danger" className="font-body text-center">
      {props.error.toString()}
    </Alert>
  );
}
