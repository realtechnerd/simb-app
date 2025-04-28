import React, { useRef, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import saveBlob from "../assets/saveBlob";
import DownloadButton from "./DownloadButton";
import verifyFileSignature from "../assets/verifyFileSignature";
import ErrorMessage from "./ErrorMessage";

export default function DecryptForm() {
  const key = useRef();
  const downloadButton = useRef();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileReturned, setFileReturned] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await verifyFileSignature(file[0]);
      setError("");
      const url = "https://simb-backend-d5731391e4de.herokuapp.com/decrypt_file";
      const formData = new FormData();

      formData.append("file", file[0]);
      formData.append("key", key.current.value);

      setFileReturned(false);
      setLoading(true);

      axios
        .post(url, formData, { responseType: "blob" })
        .then((response) => {
          saveBlob(response.data, downloadButton, "decrypted", "zip");
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
    } catch (error) {
      setError(error);
      setFileReturned(false);
    }
  }

  return (
    <>
      {error && <ErrorMessage error={error} />}
      <Form onSubmit={handleSubmit} className="font-body">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>File to Decrypt</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="password"
            placeholder="Key used to encrypt.."
            ref={key}
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
            "Decrypt"
          )}
        </Button>
      </Form>
      <DownloadButton buttonRef={downloadButton} fileReturned={fileReturned} />
    </>
  );
}
