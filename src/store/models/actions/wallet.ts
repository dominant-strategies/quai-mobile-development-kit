import { SerializedQuaiHDWallet } from "quais/lib/commonjs/wallet/quai-hdwallet";
import { Transaction } from "src/quai-mdk/blockscout";
import { input } from "src/quai-mdk/types";

export interface ISetPrimaryWalletObj {
  primaryWalletObj: SerializedQuaiHDWallet;
}

export interface ISetPrimaryWalletPubAddress {
  primaryWalletPubAddress: string;
}

export interface ISetPrimaryWalletRegion {
  primaryWalletRegion: string;
}

export interface ISetPrimaryWalletZone {
  primaryWalletZone: string;
}

export interface ISetPrimaryWalletPkeyName{
  primaryWalletPkeyName: string;
}

export interface ISetPrimaryWalletPhrase{
  primaryWalletPhrase: string;
}

export interface IRecoverQuaiHDWallet{
  seedPhrase: string;
}

export interface IResetPrimaryWallet{
  resetPrimaryWallet: boolean;
}

export interface ISetActiveWalletAddress{
  activeWalletAddress: string;
}

export interface ISetActiveWalletAddressZone{
  activeWalletAddressZone: string;
}

export interface ISetActiveWalletAddressBalance{
  activeWalletAddressBalance: string;
}

export interface ISetActiveWalletTransactions{
  activeWalletTransactions: Transaction[];
}
export interface ISendTransaction{
  from: string,
  to: string,
  input: input
  receiverPFP?: string,
  receiverUsername?: string,
  senderPFP?: string,
  senderUsername?: string,
}


interface Mnemonic {
    readonly phrase: string;
    readonly path: string;
    readonly locale: string;
  }

export interface ICreateNewWalletState {
    walletIndex: number;
    walletName: string;
    primaryWallet: boolean;
    isUserEditable: boolean;
    singleTransactionLimitWithoutPin: number;
    totalTransactionLimitWithoutPin: number;
    currentTransactionAmountSincePinReset: number;
    primaryWalletToken: string; // should be token type
    walletCreationDate: string;
    privateKeyID: string; //put in PK storage
    publicKey: string;
    parentFingerprint: string;
    fingerprint: string;
    address: string;
    chainCode: string;
    index: number;
    depth: number;
    mnemonic?: Mnemonic; // should this be stored in secure enclave?
    path: string | null;
  }

