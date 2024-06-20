import { PublicKey } from "@solana/web3.js";

import IDL_JSON from "./idl.json"

export const IDL = IDL_JSON; 

const programID = process.env.REACT_APP_PROGRAM_ID||''
console.log('REACT_APP_PROGRAM_ID = ', programID)
if (!programID) {
    console.error('PROGRAM_ID is not set')
    throw new Error('PROGRAM_ID is not set')
}

export const PROGRAM_ID = new PublicKey(programID);

// export const IDL = {"version":"0.1.0","name":"hello_anchor","instructions":[{"name":"initialize","accounts":[{"name":"newAccount","isMut":true,"isSigner":false},{"name":"signer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"data","type":"u64"},{"name":"age","type":"u16"}]}],"accounts":[{"name":"NewAccount","type":{"kind":"struct","fields":[{"name":"data","type":"u64"},{"name":"age","type":"u16"}]}}]};
// export const PROGRAM_ID = new PublicKey('E6gEbyUSGkQbwd3CpJmoHMgU9Gnzm3x5kKsLHoj5x5AT');

