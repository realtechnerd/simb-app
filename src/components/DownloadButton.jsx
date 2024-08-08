import React from "react";
import { Button } from "react-bootstrap";

export default function DownloadButton(props) {
  return (
    <>
      <a
        ref={props.buttonRef}
        style={{ display: props.fileReturned ? "block" : "none" }}
        className="btn btn-success font-body w-100 mt-3 shadow-lg"
      ></a>
    </>
  );
}
