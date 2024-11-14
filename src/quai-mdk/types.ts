import { QuaiHDWallet, Wallet, Zone } from "quais";
import { Currency } from "src/types";

export enum RegionT {
    EAST_ASIA_AND_SOUTHEAST_ASIA = 'East Asia and Southeast Asia',
    INDIA = 'India',
    MIDDLE_EAST = 'Middle East',
    NA_EAST = 'NA East',
    NA_WEST = 'NA West',
    OCEANIA = 'Oceania',
    RUSSIA = 'Russia',
    SOUTH_AMERICA = 'South America',
    WEST_EUROPE = 'West Europe',
  }
  

export enum ZoneT {
    'zone-0-0' = 'zone-0-0',
    'zone-0-1' = 'zone-0-1',
    'zone-0-2' = 'zone-0-2',
    'zone-1-0' = 'zone-1-0',
    'zone-1-1' = 'zone-1-1',
    'zone-1-2' = 'zone-1-2',
    'zone-2-0' = 'zone-2-0',
    'zone-2-1' = 'zone-2-1',
    'zone-2-2' = 'zone-2-2',
  }

  export type pKeyT = {
    pKey: Uint8Array;
    encodedPKey: string;
  }

  export interface MnemonicT {
    readonly phrase: string;
    readonly path: string;
    readonly locale: string;
  }

  export type QuaiWalletT = {
    walletID: string;
    walletName: string;
    zone: string;
    address: string;
    pKey?: string | null;
    pkeyName: string;
    walletObject: Wallet;
  }

  export type WalletT = {
    privateKey: string;
    publicKey: string;
    parentFingerprint: string;
    fingerprint: string;
    address: string;
    chainCode: string;
    index: number;
    depth: number;
    mnemonic?: MnemonicT;
    path: string | null;
  };

  export type KeychainItemT = 
  { 
    key: string; 
    value: string;
  };

  export type QuaiRateT = 
  {
    base: number;
    quote: number;
  }

  export type input = {
    value: string;
    unit: Currency;
    tip?: string;
  }

  export type QuaiTxRequestData = {
    fromAddress: string;
    toAddress: string;
    zone: Zone;
    value: string;
    wallet: QuaiHDWallet;
  }

  export enum SignerSourceTypes {
    privateKey = "privateKey",
    keyring = "keyring",
  }
  
  export type InternalSignerHDKeyring = {
    signer: QuaiHDWallet
    address: string
    type: SignerSourceTypes.keyring
  }
  export type InternalSignerPrivateKey = {
    signer: Wallet
    address: string
    type: SignerSourceTypes.privateKey
  }
  export type InternalSignerWithType =
    | InternalSignerPrivateKey
    | InternalSignerHDKeyring
  
