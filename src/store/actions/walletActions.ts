import { SerializedHDWallet } from 'quais/lib/commonjs/wallet/hdwallet';
import * as types from './types';
import { Transaction } from 'src/quai-mdk/blockscout';
import { ISendTransaction } from '../models/actions/wallet';

export function createNewQuaiHDWallet(){
  return {
  type: types.CREATE_NEW_QUAI_HD_WALLET,
  };
}

export function recoverQuaiHDWallet(seedPhrase: string){
  return {
  type: types.RECOVER_QUAI_HD_WALLET,
  seedPhrase,
  };
}

export function setPrimaryWalletObject(primaryWalletObj: SerializedHDWallet) {
    return {
      type: types.SET_PRIMARY_WALLET_OBJ,
      primaryWalletObj,
    };
  }

  export function setPrimaryWalletPubAddress(primaryWalletPubAddress: string) {
    return {
      type: types.SET_PRIMARY_WALLET_PUB_ADDR,
      primaryWalletPubAddress,
    };
  }

  export function setPrimaryWalletPkeyName(primaryWalletPkeyName: string) {
    return {
      type: types.SET_PRIMARY_WALLET_PKEY_NAME,
      primaryWalletPkeyName,
    };
  }

  export function setPrimaryWalletRegion(primaryWalletRegion: string) {
    return {
      type: types.SET_PRIMARY_WALLET_REGION,
      primaryWalletRegion,
    };
  }

  export function setPrimaryWalletZone(primaryWalletZone: string) {
    return {
      type: types.SET_PRIMARY_WALLET_ZONE,
      primaryWalletZone,
    };
  }

  export function setPrimaryWalletPhrase(primaryWalletPhrase: string) {
    return {
      type: types.SET_PRIMARY_WALLET_PHRASE,
      primaryWalletPhrase,
    };
  }

  export function resetPrimaryWallet(resetPrimaryWallet: boolean) {
    return {
      type: types.RESET_PRIMARY_WALLET,
      resetPrimaryWallet,
    };
  }

  export function setActiveWalletAddress(activeWalletAddress: string) {
    return {
      type: types.SET_ACTIVE_WALLET_ADDRESS,
      activeWalletAddress,
    };
  }

  export function setActiveWalletZone(activeWalletAddressZone: string) {
    return {
      type: types.SET_ACTIVE_WALLET_ZONE,
      activeWalletAddressZone,
    };
  }

  export function fetchActiveWalletAddressBalance(){
    return {
     type: types.FETCH_ACTIVE_WALLET_BALANCE,
    }
  }

  export function fetchActiveWalletAddressTransactions(){
    return {
     type: types.FETCH_ACTIVE_WALLET_TRANSACTIONS,
    }
  }

   export function setActiveWalletBalance(activeWalletAddressBalance: string) {
    return {
      type: types.SET_ACTIVE_WALLET_BALANCE,
      activeWalletAddressBalance,
    };
  }

  export function setActiveWalletTransactions(activeWalletTransactions: Transaction[]){
    return {
      type: types.SET_ACTIVE_WALLET_TRANSACTIONS,
      activeWalletTransactions,
    };
  }

  export function sendQuaiTransaction(txData: ISendTransaction){
    return {
      type: types.SEND_QUAI_TRANSACTION,
      payload: txData,
    };
  }



