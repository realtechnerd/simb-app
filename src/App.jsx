import { useState, useRef } from "react";
import { Card, Container, Tabs, Tab } from "react-bootstrap";
import DecryptForm from "./components/DecryptForm";
import EncryptForm from "./components/EncryptForm";

export default function App() {
  const [key, setKey] = useState("home");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <Container
        className="flex items-center justify-center"
        style={{ minHeight: "calc(100vh - 24px)" }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card className="shadow-lg border-none">
            <Card.Body>
              <h1 className="text-2xl mb-3 text-center font-black font-display">
                SIMB
              </h1>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 font-body"
                fill
              >
                <Tab
                  eventKey="home"
                  title={<span className="font-extrabold">Encrypt</span>}
                >
                  <EncryptForm />
                </Tab>
                <Tab
                  eventKey="profile"
                  title={<span className="font-extrabold">Decrypt</span>}
                >
                  <DecryptForm />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
