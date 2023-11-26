import React, { useState } from "react";
import * as michelsonImport from "michelson-interpreter";
import Rjv from "react-json-tree-viewer";
import "./MyMichelsonComponent.css";

const michelsonInterpreter = michelsonImport.default.michelsonInterpreter;
const State = michelsonImport.default.State;

function MyMichelsonComponent() {
  const [fileIsIn, setFileIsIn] = useState(null);
  const [script, setScript] = useState(null);
  const [showAccountField, setShowAccountField] = useState(null);
  const [showAddressField, setShowAddressField] = useState(null);
  const [showAmountField, setShowAmountField] = useState(null);
  const [showEntrypointField, setShowEntrypointField] = useState(null);
  const [showGas_limitField, setShowGas_limitField] = useState(null);
  const [showIdField, setShowIdField] = useState(null);
  const [showTimestampField, setShowTimestampField] = useState(null);
  const [interpreterOutput, setInterpreterOutput] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [parameterInfo, setParameterInfo] = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);
  const [parameterInput, setParameterInput] = useState("");
  const [storageInput, setStorageInput] = useState("");
  const [accountInput, setAccountInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [entrypointInput, setEntrypointInput] = useState("");
  const [gas_limitInput, setGas_limitInput] = useState("");
  const [idInput, setIdInput] = useState("");
  const [timestampInput, setTimestampInput] = useState("");

  const prepareFileChosen = async (event) => {
    resetAll();
    const localFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const localScript = e.target.result;
      const splitScript = localScript.split(";");
      const parameter = splitScript[0].split("parameter ")[1].trim();
      const storage = splitScript[1].split("storage ")[1].trim();
      setScript(localScript);
      setParameterInfo(parameter);
      setStorageInfo(storage);
      setFileIsIn(true);
    };
    fileReader.readAsText(localFile);
  };

  const resetAll = () => {
    setCurrentStep(0);
    setParameterInput("");
    setStorageInput("");
    setAccountInput("");
    setAddressInput("");
    setAmountInput("");
    setEntrypointInput("");
    setGas_limitInput("");
    setIdInput("");
    setShowAccountField(null);
    setShowAddressField(null);
    setShowAmountField(null);
    setShowEntrypointField(null);
    setShowGas_limitField(null);
    setShowIdField(null);
    setShowTimestampField(null);
    setTimestampInput("");
    setInterpreterOutput(null);
    setScript(script);
    setParameterInfo(null);
    setStorageInfo(null);
    setFileIsIn(null);
  };

  const handleAddAccountField = async (event) => {
    setShowAccountField(true);
  };
  const handleAddAddressField = async (event) => {
    setShowAddressField(true);
  };
  const handleAddAmountField = async (event) => {
    setShowAmountField(true);
  };
  const handleAddEntrypointField = async (event) => {
    setShowEntrypointField(true);
  };
  const handleAddGas_limitField = async (event) => {
    setShowGas_limitField(true);
  };
  const handleAddIdField = async (event) => {
    setShowIdField(true);
  };
  const handleAddTimestampField = async (event) => {
    setShowTimestampField(true);
  };

  const handleFileWithParameters = async (event) => {
    event.preventDefault();
    const state = new State(
      accountInput || "",
      addressInput || "",
      amountInput || 0,
      entrypointInput || "default",
      gas_limitInput || 0,
      idInput || 0,
      timestampInput || 0
    );
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

  const handleAccountInputChange = (event) => {
    setAccountInput(event.target.value);
  };
  const handleAddressInputChange = (event) => {
    setAddressInput(event.target.value);
  };
  const handleAmountInputChange = (event) => {
    setAmountInput(event.target.value);
  };
  const handleEntrypointInputChange = (event) => {
    setEntrypointInput(event.target.value);
  };
  const handleGas_limitInputChange = (event) => {
    setGas_limitInput(event.target.value);
  };
  const handleIdInputChange = (event) => {
    setIdInput(event.target.value);
  };
  const handleTimestampInputChange = (event) => {
    setTimestampInput(event.target.value);
  };

  return (
    <div style={{ marginBottom: "200px" }}>
      <h3>Michelson Interpreter</h3>
      <div className="my-michelson-component">
        <input
          type="file"
          onChange={prepareFileChosen}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFileWithParameters(e);
            }
          }}
          style={{ margin: "20px" }}
        />
        {fileIsIn && (
          <form>
            <div className="input-info" style={{ marginBottom: "20px" }}>
              <h4 className="input-label">
                Parameter (type: {parameterInfo})
                <br />
                Storage (type: {storageInfo})
              </h4>
            </div>
            <div className="obligatory inputs" style={{ marginBottom: "30px" }}>
              <label style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "10px" }}>Parameter: </span>
                <input
                  type="text"
                  value={parameterInput}
                  onChange={handleParameterInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleFileWithParameters(e);
                    }
                  }}
                  placeholder="Bitte Parameter eingeben"
                />
              </label>
              <label>
                <span style={{ marginRight: "10px", marginLeft: "60px" }}>
                  Storage:{" "}
                </span>
                <input
                  type="text"
                  value={storageInput}
                  onChange={handleStorageInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleFileWithParameters(e);
                    }
                  }}
                  placeholder="Bitte Storage eingeben"
                />
              </label>{" "}
            </div>
            <div className="optional inputs" style={{ marginBottom: "25px" }}>
              <p style={{ marginBottom: "15px" }}> Edit optional Inputs</p>
              {showAccountField !== true && (
                <button
                  className="insert-account-button"
                  onClick={handleAddAccountField}
                  style={{ margin: "10px" }}
                >
                  Add custom account
                </button>
              )}
              {showAddressField !== true && (
                <button
                  className="insert-address-button"
                  onClick={handleAddAddressField}
                  style={{ margin: "10px" }}
                >
                  Add custom address
                </button>
              )}
              {showAmountField !== true && (
                <button
                  className="insert-amount-button"
                  onClick={handleAddAmountField}
                  style={{ margin: "10px" }}
                >
                  Add custom amount
                </button>
              )}
              {showEntrypointField !== true && (
                <button
                  className="insert-entrypoint-button"
                  onClick={handleAddEntrypointField}
                  style={{ margin: "10px" }}
                >
                  Add custom entrypoint
                </button>
              )}
              {showGas_limitField !== true && (
                <button
                  className="insert-gas_limit-button"
                  onClick={handleAddGas_limitField}
                  style={{ margin: "10px" }}
                >
                  Add custom gas_limit
                </button>
              )}
              {showIdField !== true && (
                <button
                  className="insert-id-button"
                  onClick={handleAddIdField}
                  style={{ margin: "10px" }}
                >
                  Add custom id
                </button>
              )}
              {showTimestampField !== true && (
                <button
                  className="insert-timesptamp-button"
                  onClick={handleAddTimestampField}
                  style={{ margin: "10px" }}
                >
                  Add custom timestamp
                </button>
              )}
            </div>

            <div
              className="optional input fields"
              style={{ marginBottom: "25px" }}
            >
              {showAccountField === true && (
                <label style={{ marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                    Account:{" "}
                  </span>
                  <input
                    type="text"
                    value={accountInput}
                    onChange={handleAccountInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFileWithParameters(e);
                      }
                    }}
                    placeholder="Account String eingeben"
                  />
                </label>
              )}
              {showAddressField === true && (
                <label style={{ marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                    Address:{" "}
                  </span>
                  <input
                    type="text"
                    value={addressInput}
                    onChange={handleAddressInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFileWithParameters(e);
                      }
                    }}
                    placeholder="Address String eingeben"
                  />
                </label>
              )}
              {showAmountField === true && (
                <label style={{ marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                    Amount:{" "}
                  </span>
                  <input
                    type="text"
                    value={amountInput}
                    onChange={handleAmountInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFileWithParameters(e);
                      }
                    }}
                    placeholder="Amount Int eingeben"
                  />
                </label>
              )}
              {showEntrypointField === true && (
                <label style={{ marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                    Entrypoint:{" "}
                  </span>
                  <input
                    type="text"
                    value={entrypointInput}
                    onChange={handleEntrypointInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFileWithParameters(e);
                      }
                    }}
                    placeholder="Entrypoint String eingeben"
                  />
                </label>
              )}
            </div>
            <div
              className="optional input fields"
              style={{ marginBottom: "25px" }}
            >
              {showGas_limitField === true && (
                <label style={{ marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                    Gas_limit:{" "}
                  </span>
                  <input
                    type="text"
                    value={gas_limitInput}
                    onChange={handleGas_limitInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFileWithParameters(e);
                      }
                    }}
                    placeholder="Gas_limit Number eingeben"
                  />
                </label>
              )}
              {showIdField === true && (
                <label style={{ marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                    Id:{" "}
                  </span>
                  <input
                    type="text"
                    value={idInput}
                    onChange={handleIdInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFileWithParameters(e);
                      }
                    }}
                    placeholder="Id Number eingeben"
                  />
                </label>
              )}
              {showTimestampField === true && (
                <label style={{ marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px", marginLeft: "40px" }}>
                    Timestamp:{" "}
                  </span>
                  <input
                    type="text"
                    value={timestampInput}
                    onChange={handleTimestampInputChange}
                    placeholder="Siehe Info"
                  />
                  <br />
                  <p>
                    Timestamp as a string in RFC3339 notation or an int as an
                    Unix time
                  </p>
                </label>
              )}
            </div>
            <div>
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
