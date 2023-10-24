
import React from 'react';
import * as michelsonImport from "michelson-interpreter";

console.log("MichelsonImport:", michelsonImport);
const michelsonInterpreter = michelsonImport.default.michelsonInterpreter;
const State = michelsonImport.default.State;
console.log("michelsonInterpreter: ", michelsonInterpreter);
console.log("State: ", State);

function MyMichelsonComponent() {
  const handleFileChosen = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const script = e.target.result;
      const state = new State('', '', 0, 'default', 0, 0, 0);
      const michelsonReturnValue = michelsonInterpreter(script, 0.1, 0.1, state);
      console.log(michelsonReturnValue);
      console.log("File on load");
    };
    fileReader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChosen} />
    </div>
  );
}

export default MyMichelsonComponent;