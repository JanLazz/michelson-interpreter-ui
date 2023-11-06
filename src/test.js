import React, { useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { Map } from 'immutable';
import * as michelsonImport from "michelson-interpreter";
import Rjv from 'react-json-tree-viewer';

const michelsonInterpreter = michelsonImport.default.michelsonInterpreter;
const State = michelsonImport.default.State;

function MyMichelsonComponent() {
  const [interpreterOutput, setInterpreterOutput] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const jsonData = {
    key: 'value',
    nested: {
      nestedKey: 'nestedValue',
    },
  };


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

  const theme = {
    scheme: 'solarized',
    author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
    base00: '#F5FFF0',
    base01: '#073642',
    base02: '#586e75',
    base03: '#657b83',
    base04: '#839496',
    base05: '#93a1a1',
    base06: '#eee8d5',
    base07: '#fdf6e3',
    base08: '#dc322f',
    base09: '#cb4b16',
    base0A: '#b58900',
    base0B: '#859900',
    base0C: '#2aa198',
    base0D: '#268bd2',
    base0E: '#6c71c4',
    base0F: '#d33682'
  };

  return (
    <div className="my-michelson-component">
      <input type="file" onChange={handleFileChosen} style={{margin: '20px'}}/>
      {interpreterOutput && (
        <div>
          <button className="nav-button" onClick={handlePrevStep} disabled={currentStep === 0} style={{margin: '10px'}}>Back</button>
          <button className="nav-button" onClick={handleNextStep} disabled={currentStep === interpreterOutput.length - 1} style={{margin: '10px'}}>Next</button>
          <div>
            <div className="parameter-json-container">
              <div className="parameter-info">
                <h className="parameter-label" style={{margin: '20px'}}>Parameter</h>
                <pre >{`parameter int;`}</pre>
              </div >
              <h className="step-label" style={{margin: '20px'}}>Step {currentStep + 1}</h>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px'}}>
              <Rjv 
                data={interpreterOutput[currentStep]}
                hideRoot={true} 
                style={{ margin: '10px' }}
                arrowStyle={{ color: 'black' }}
                shouldExpandNode={(path, data) => path.length === 1}
              />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*
 <div style={{ display: 'flex', justifyContent: 'center', margin: '20px'}}>
              <Rjv 
                data={interpreterOutput[currentStep]}
                hideRoot={true} 
                style={{ margin: '10px' }}
                arrowStyle={{ color: 'black' }}
                shouldExpandNode={(path, data) => path.length === 1}/>
            </div>
*/

/*<div>
              <JSONTree
                data={interpreterOutput[currentStep]}
                hideRoot={true}
                theme={{
                  extend: theme,
                  valueLabel: {
                    textDecoration: 'underline',
                  },
                  nestedNodeLabel: ({ style }, keyPath, nodeType, expanded) => ({
                    style: {
                      ...style,
                      textTransform: expanded ? 'uppercase' : style.textTransform,
                    },
                  }),
                }}
              /> 
            </div>*/

export default MyMichelsonComponent;
