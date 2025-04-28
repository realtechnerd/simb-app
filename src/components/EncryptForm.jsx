import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, InputGroup, Spinner } from "react-bootstrap";
import saveBlob from "../assets/saveBlob";
import DownloadButton from "./DownloadButton";
import ErrorMessage from "./ErrorMessage";

export default function EncryptForm() {
  const filename = useRef();
  const key = useRef();
  const confirmKey = useRef();
  const downloadButton = useRef();
  const form = useRef();
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const [fileReturned, setFileReturned] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const url = "https://simb-backend-d5731391e4de.herokuapp.com/encrypt_file";
    const formData = new FormData();

    if (key.current.value == confirmKey.current.value) {
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }

      formData.append("key", key.current.value);

      setFileReturned(false);
      setLoading(true);

      axios
        .post(url, formData, { responseType: "blob" })
        .then((response) => {
          saveBlob(
            response.data,
            downloadButton,
            filename.current.value,
            "simb"
          );
          setLoading(false);
          setFileReturned(true);
          setError("");
          e.target.reset();
        })
        .catch((err) => {
          setError(err);
          setFileReturned(false);
          setLoading(false);
        });
    } else {
      setError("Keys don't match!");
    }
  }

  return (
    <>
      {error && <ErrorMessage error={error} />}
      <Form onSubmit={handleSubmit} className="font-body" ref={form}>
        <Form.Group className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Files to Encrypt</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
          </Form.Group>
          <Form.Label>File name</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="File name.."
              ref={filename}
              required
            />
            <InputGroup.Text id="basic-addon2">.simb</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="password"
            placeholder="A secure key.."
            ref={key}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Key</Form.Label>
          <Form.Control
            type="password"
            placeholder="Retype your key.."
            ref={confirmKey}
            required
          />
        </Form.Group>
        <Button className="w-100" type="submit" disabled={loading}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Encrypt"
          )}
        </Button>
      </Form>
      <DownloadButton buttonRef={downloadButton} fileReturned={fileReturned} />
    </>
  );
}
