import React, { useState } from "react";
import * as michelsonImport from "michelson-interpreter";
import Rjv from "react-json-tree-viewer";
import "./MyMichelsonComponent.css";

const michelsonInterpreter = michelsonImport.default.michelsonInterpreter;
const State = michelsonImport.default.State;

function MyMichelsonComponent() {
  const [fileIsIn, setFileIsIn] = useState(null);
  const [script, setScript] = useState(null);
  const [expandNode, setExpandNode] = useState(false);
  const [showOptionalInputs, setShowOptionalInputs] = useState(false);
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
    setFileIsIn(null);
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
      setFileIsIn(localFile.name);
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

  const handleShowOptionalInputs = async (event) => {
    setShowOptionalInputs(!showOptionalInputs);
  };

  const handleExpandNode = async (event) => {
    setExpandNode(!expandNode);
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
    <div className="parent-div">
      <h2>Michelson Interpreter</h2>
      <div className="my-michelson-component">
        <div className="file-upload-container">
          <label htmlFor="file-upload" className="file-upload-label">
            Choose a file
          </label>
          <input
            id="file-upload"
            className="file-upload-input"
            type="file"
            onChange={prepareFileChosen}
          />
          {fileIsIn && <p className="file-name">Selected file: {fileIsIn}</p>}
        </div>

        {fileIsIn && (
          <form>
            <div className="input-info">
              <h4 className="input-label">
                Parameter (type: {parameterInfo})
                <br />
                Storage (type: {storageInfo})
              </h4>
            </div>
            <div className="obligatory-inputs">
              <label className="parameter-label">
                <span className="parameter-span">Parameter: </span>
                <input
                  className="parameter-input-field"
                  type="text"
                  value={parameterInput}
                  onChange={handleParameterInputChange}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      parameterInput !== "" &&
                      storageInput !== ""
                    ) {
                      e.preventDefault();
                      handleFileWithParameters(e);
                    }
                  }}
                  placeholder="Please enter parameter"
                />
              </label>
              <label>
                <span className="storage-span">Storage: </span>
                <input
                  className="storage-input-field"
                  type="text"
                  value={storageInput}
                  onChange={handleStorageInputChange}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      parameterInput !== "" &&
                      storageInput !== ""
                    ) {
                      e.preventDefault();
                      handleFileWithParameters(e);
                    }
                  }}
                  placeholder="Please enter storage"
                />
              </label>{" "}
            </div>
            <button
              type="button"
              className="show-optional-inputs-button"
              onClick={handleShowOptionalInputs}
            >
              {showOptionalInputs
                ? "Hide optional Inputs"
                : "Show optional Inputs"}
            </button>
            {showOptionalInputs && (
              <div className="optional-inputs">
                {!showAccountField && (
                  <button
                    className="insert-optional-account-button"
                    onClick={handleAddAccountField}
                  >
                    Add custom account
                  </button>
                )}
                {!showAddressField && (
                  <button
                    className="insert-optional-address-button"
                    onClick={handleAddAddressField}
                  >
                    Add custom address
                  </button>
                )}
                {!showAmountField && (
                  <button
                    className="insert-optional-amount-button"
                    onClick={handleAddAmountField}
                  >
                    Add custom amount
                  </button>
                )}
                {!showEntrypointField && (
                  <button
                    className="insert-optional-entrypoint-button"
                    onClick={handleAddEntrypointField}
                  >
                    Add custom entrypoint
                  </button>
                )}
                {!showGas_limitField && (
                  <button
                    className="insert-optional-gas_limit-button"
                    onClick={handleAddGas_limitField}
                  >
                    Add custom gas_limit
                  </button>
                )}
                {!showIdField && (
                  <button
                    className="insert-optional-id-button"
                    onClick={handleAddIdField}
                  >
                    Add custom id
                  </button>
                )}
                {!showTimestampField && (
                  <button
                    className="insert-optional-timestamp-button"
                    onClick={handleAddTimestampField}
                  >
                    Add custom timestamp
                  </button>
                )}
              </div>
            )}
            {showOptionalInputs && (
              <div className="optional-input-fields">
                {showAccountField && (
                  <label className="optional-input-label">
                    <span className="optional-input-span">Account: </span>
                    <input
                      className="account-input-field"
                      type="text"
                      value={accountInput}
                      onChange={handleAccountInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleFileWithParameters(e);
                        }
                      }}
                      placeholder="Enter account string"
                    />
                  </label>
                )}
                {showAddressField && (
                  <label className="optional-input-label">
                    <span className="optional-input-span">Address: </span>
                    <input
                      className="address-input-field"
                      type="text"
                      value={addressInput}
                      onChange={handleAddressInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleFileWithParameters(e);
                        }
                      }}
                      placeholder="Enter address string"
                    />
                  </label>
                )}
                {showAmountField && (
                  <label className="optional-input-label">
                    <span className="optional-input-span">Amount: </span>
                    <input
                      className="amount-input-field"
                      type="text"
                      value={amountInput}
                      onChange={handleAmountInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleFileWithParameters(e);
                        }
                      }}
                      placeholder="Enter amount integer"
                    />
                  </label>
                )}
                {showEntrypointField && (
                  <label className="optional-input-label">
                    <span className="optional-input-span">Entrypoint: </span>
                    <input
                      className="entrypoint-input-field"
                      type="text"
                      value={entrypointInput}
                      onChange={handleEntrypointInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleFileWithParameters(e);
                        }
                      }}
                      placeholder="Enter entrypoint string"
                    />
                  </label>
                )}
              </div>
            )}
            {showOptionalInputs && (
              <div className="optional-input-fields">
                {showGas_limitField && (
                  <label className="optional-input-label">
                    <span className="optional-input-span">Gas_limit: </span>
                    <input
                      className="gas_limit-input-field"
                      type="text"
                      value={gas_limitInput}
                      onChange={handleGas_limitInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleFileWithParameters(e);
                        }
                      }}
                      placeholder="Enter gas_limit number"
                    />
                  </label>
                )}
                {showIdField && (
                  <label className="optional-input-label">
                    <span className="optional-input-span">Id: </span>
                    <input
                      className="id-input-field"
                      type="text"
                      value={idInput}
                      onChange={handleIdInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleFileWithParameters(e);
                        }
                      }}
                      placeholder="Enter id number"
                    />
                  </label>
                )}
                {showTimestampField && (
                  <label className="optional-input-label">
                    <span className="optional-input-span">Timestamp: </span>
                    <input
                      className="timestamp-input-field"
                      type="text"
                      value={timestampInput}
                      onChange={handleTimestampInputChange}
                      placeholder="See Information"
                    />
                    <br />
                    <p>
                      Timestamp as a string in RFC3339 notation or an int as an
                      Unix time
                    </p>
                  </label>
                )}
              </div>
            )}
            <div>
              <button
                className="submit-input-button"
                onClick={handleFileWithParameters}
                disabled={parameterInput === "" || storageInput === ""}
              >
                Submit
              </button>
            </div>
            {interpreterOutput && (
              <div>
                <button
                  type="button"
                  className="change-root-state-button"
                  onClick={handleExpandNode}
                >
                  {expandNode ? "Shrink tree" : "Expand tree"}
                </button>
              </div>
            )}
          </form>
        )}
        {interpreterOutput && (
          <div>
            <button
              className="prev-button"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              className="next-button"
              onClick={handleNextStep}
              disabled={currentStep === interpreterOutput.length - 1}
            >
              Next
            </button>
            <div>
              <p className="step-p">Step {currentStep + 1}</p>
              <div className="step-div">
                {!expandNode && (
                  <Rjv
                    className="rjv-component"
                    data={interpreterOutput[currentStep]}
                    hideRoot={true}
                    arrowStyle={{ color: "black" }}
                    shouldExpandNode={(path, data) => path.length === 1}
                  />
                )}
                {expandNode && (
                  <Rjv
                    className="rjv-component"
                    data={interpreterOutput[currentStep]}
                    hideRoot={true}
                    arrowStyle={{ color: "black" }}
                    shouldExpandNode={(path, data) => true}
                  />
                )}
              </div>
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyMichelsonComponent;
