import React, { useState } from "react";
import { JSONTree } from "react-json-tree";
import { Map } from "immutable";
import * as michelsonImport from "michelson-interpreter";
import Rjv from "react-json-tree-viewer";
import "./MyMichelsonComponent.css";

const michelsonInterpreter = michelsonImport.default.michelsonInterpreter;
const State = michelsonImport.default.State;

function MyMichelsonComponent() {
  const [fileIsIn, setFileIsIn] = useState(null);
  const [file, setFile] = useState(null);
  const [script, setScript] = useState(null);
  const [interpreterOutput, setInterpreterOutput] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [parameterInfo, setParameterInfo] = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);
  const [parameterInput, setParameterInput] = useState("");
  const [storageInput, setStorageInput] = useState("");
  const jsonData = {
    key: "value",
    nested: {
      nestedKey: "nestedValue",
    },
  };

  const prepareFileChosen = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const script = e.target.result;
      const splitScript = script.split(";");
      const parameter = splitScript[0].split("parameter ")[1].trim();
      const storage = splitScript[1].split("storage ")[1].trim();
      setScript(script);
      setParameterInfo(parameter);
      setStorageInfo(storage);
      setFileIsIn(true);
    };
    setFile(fileReader.readAsText(file));
  };

  const handleFileWithParameters = async (event) => {
    event.preventDefault();
    const state = new State("", "", 0, "default", 0, 0, 0);
    const michelsonReturnValue = michelsonInterpreter(
      script,
      parameterInput,
      storageInput,
      state
    );
    const parsedOutput = JSON.parse(michelsonReturnValue);
    setInterpreterOutput(parsedOutput);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < interpreterOutput.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleParameterInputChange = (event) => {
    setParameterInput(event.target.value);
  };

  const handleStorageInputChange = (event) => {
    setStorageInput(event.target.value);
  };

  const checkParameterType = (param) => {
    if (param === "account") {
      return "Insert account as a string";
    } else if (param === "address") {
      return "Insert address as a string";
    } else if (param === "amount") {
      return "Insert amount as an int";
    } else if (param === "entrypoint") {
      return "Insert entrypoint as a string";
    } else if (param === "gas_limit") {
      return "Insert gas_limit as an int";
    } else if (param === "id") {
      return "Insert id as an int";
    } else if (param === "timestamp") {
      return "Insert timestamp as a string in RFC3339 notation or an int as an Unix time";
    }
  };

  return (
    <div>
      <h3>Michelson Interpreter</h3>
      <div className="my-michelson-component">
        <input
          type="file"
          onChange={prepareFileChosen}
          style={{ margin: "20px" }}
        />
        {fileIsIn && (
          <form>
            <div className="input-info" style={{ marginBottom: "25px" }}>
              <h4 className="input-label">
                Parameter (type: {parameterInfo}){" "}
                {checkParameterType(parameterInfo)}
                <br />
                Storage (type: {storageInfo})
              </h4>
            </div>
            <div>
              <label style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "10px" }}>Parameter: </span>
                <input
                  type="text"
                  value={parameterInput}
                  onChange={handleParameterInputChange}
                  placeholder="Bitte Parameter eingeben"
                />
              </label>
              <label style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                  Storage:{" "}
                </span>
                <input
                  type="text"
                  value={storageInput}
                  onChange={handleStorageInputChange}
                  placeholder="Bitte Storage eingeben"
                />
              </label>{" "}
              <button
                className="submit-input-button"
                onClick={handleFileWithParameters}
                disabled={parameterInput === "" || storageInput === ""}
                style={{ margin: "10px" }}
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {interpreterOutput && (
          <div>
            <button
              className="nav-button"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              style={{ margin: "10px" }}
            >
              Back
            </button>
            <button
              className="nav-button"
              onClick={handleNextStep}
              disabled={currentStep === interpreterOutput.length - 1}
              style={{ margin: "10px" }}
            >
              Next
            </button>
            <div>
              <p
                className="step-label"
                style={{ style: "font-size: 80%", margin: "20px" }}
              >
                Step {currentStep + 1}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px",
                }}
              >
                <Rjv
                  data={interpreterOutput[currentStep]}
                  hideRoot={true}
                  style={{ margin: "10px" }}
                  arrowStyle={{ color: "black" }}
                  shouldExpandNode={(path, data) => path.length === 1}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyMichelsonComponent;
