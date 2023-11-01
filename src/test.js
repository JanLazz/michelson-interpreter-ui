import React, { useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { Map } from 'immutable';
import * as michelsonImport from "michelson-interpreter";

const michelsonInterpreter = michelsonImport.default.michelsonInterpreter;
const State = michelsonImport.default.State;

function MyMichelsonComponent() {
  const [interpreterOutput, setInterpreterOutput] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleFileChosen = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const script = e.target.result;
      const state = new State('', '', 0, 'default', 0, 0, 0);
      const michelsonReturnValue = michelsonInterpreter(script, 0.1, 0.1, state);
      const parsedOutput = JSON.parse(michelsonReturnValue);
      setInterpreterOutput(parsedOutput);
      setCurrentStep(0);
    };
    fileReader.readAsText(file);
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

  return (
    <div>
      <input type="file" onChange={handleFileChosen} />
      {interpreterOutput && (
        <div>
          <button onClick={handlePrevStep} disabled={currentStep === 0}>Back</button>
          <button onClick={handleNextStep} disabled={currentStep === interpreterOutput.length - 1}>Next</button>
          <div>
            <h>Step {currentStep + 1}</h>
            <pre>{JSON.stringify(interpreterOutput[currentStep], null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyMichelsonComponent;
