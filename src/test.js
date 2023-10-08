
import React from 'react';
//import * as michelsonImport from "michelson-interpreter";
import {michelsonInterpreter, State} from 'michelson-interpreter';
//console.log("MichelsonImport: ");
//console.log(JSON.stringify(michelsonImport));
//import michelsonInterpreter from 'michelson-interpreter';
console.log("michelsonInterpreter: ", michelsonInterpreter);
//console.log("types", types)
console.log("State: ", State);

/*lass State {
    constructor(account, address, amount, entrypoint, gas_limit, id, timestamp) {
        this.account = account;
        this.address = address;
        this.amount = amount;
        this.entrypoint = entrypoint;
        this.gas_limit = gas_limit;
        this.id = id;
        this.timestamp = timestamp;
    }
}*/

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