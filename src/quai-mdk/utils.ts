import { randomBytes } from "quais"
import { InternalSignerPrivateKey, InternalSignerWithType, SignerSourceTypes } from "./types";

export const abbreviateAddress = (address?: string) => {
    return address ? `${address.slice(0, 8)}...${address.slice(-8)}` : '';
  };


export const shortAddress = (address?: string) => {
    return address ? `...${address.slice(-10)}` : '';
  };

  export const isSignerPrivateKeyType = (
    signer: InternalSignerWithType
  ): signer is InternalSignerPrivateKey =>
    signer.type === SignerSourceTypes.privateKey
  
  export const generateRandomBytes = (numWords: number): Uint8Array => {
    const strength = (numWords / 3) * 32
    return randomBytes(strength / 8)
  }

  export function bigIntToDecimal(
    bigIntValue: bigint,
    decimalPlaces = 18,
    precision = 3
  ) {
    if (bigIntValue == BigInt(0)) return "0.000"
  
    let bigIntStr = bigIntValue.toString()
    while (bigIntStr.length < decimalPlaces) {
      bigIntStr = `0${bigIntStr}`
    }
  
    // Calculate the index where we need to insert the decimal point
    const decimalIndex = bigIntStr.length - decimalPlaces
  
    // Insert the decimal point at the correct index
    const result = `${bigIntStr.slice(0, decimalIndex)}.${bigIntStr.slice(
      decimalIndex,
      decimalIndex + precision
    )}`
  
    return parseFloat(result).toFixed(precision)
  }