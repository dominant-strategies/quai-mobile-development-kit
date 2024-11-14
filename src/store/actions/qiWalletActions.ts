import { NeuteredAddressInfo } from 'quais/lib/commonjs/wallet/hdwallet';
import * as types from './types';
import { Transaction } from 'src/types';
import { SerializedQiHDWallet } from 'quais';
import { ISendTransaction } from '../models/actions/wallet';

export function createNewQiHDWallet(){
    return {
    type: types.CREATE_NEW_QI_HD_WALLET,
    };
  }
  
  export function recoverQiHDWallet(seedPhrase: string){
    return {
    type: types.RECOVER_QI_HD_WALLET,
    seedPhrase,
    };
  }
 
  export function scanQiHDWallet(){
    return {
    type: types.SCAN_QI_WALLET,
    };
  }

  export function syncQiHDWallet(){
    return {
    type: types.SYNC_QI_WALLET,
    };
  }

  export function setPrimaryQiWalletScanned(primaryQiWalletScanned: boolean) {
    return {
      type: types.SET_PRIMARY_QI_WALLET_SCANNED,
      primaryQiWalletScanned,
    };
  }

  export function setPrimaryQiWalletSynced(primaryQiWalletSynced: boolean) {
    return {
      type: types.SET_PRIMARY_QI_WALLET_SYNCED,
      primaryQiWalletSynced,
    };
  }

  export function setPrimaryQiWalletLastSynced(primaryQiWalletLastSynced: string) {
    return {
      type: types.SET_PRIMARY_QI_WALLET_LAST_SYNCED,
      primaryQiWalletLastSynced,
    };
  }

  export function setPrimaryQiWalletObject(primaryQiWalletObj: SerializedQiHDWallet) {
    return {
      type: types.SET_PRIMARY_QI_WALLET_OBJ,
      primaryQiWalletObj,
    };
  }

  export function setPrimaryQiWalletPhrase(primaryQiWalletPhrase: string) {
    return {
      type: types.SET_PRIMARY_QI_WALLET_PHRASE,
      primaryQiWalletPhrase,
    };
  }

  export function setPrimaryQiWalletAddress(primaryQiWalletAddress: string) {
    return {
      type: types.SET_PRIMARY_QI_WALLET_ADDR,
      primaryQiWalletAddress,
    };
  }

  export function setActiveQiWalletAddress(activeQiWalletAddress: string) {
    return {
      type: types.SET_ACTIVE_QI_WALLET_ADDRESS,
      activeQiWalletAddress,
    };
  }

  export function setActiveQiWalletNextAddress(activeQiWalletNextAddress: string) {
    return {
      type: types.SET_ACTIVE_QI_WALLET_NEXT_ADDRESS,
      activeQiWalletNextAddress,
    };
  }

  export function setActiveQiWalletAddresses(activeQiWalletAddresses: NeuteredAddressInfo[]) {
    return {
      type: types.SET_ACTIVE_QI_WALLET_ADDRESSES,
      activeQiWalletAddresses,
    };
  }

  export function setActiveQiWalletGapAddresses(activeQiWalletGapAddresses: NeuteredAddressInfo[]) {
    return {
      type: types.SET_ACTIVE_QI_WALLET_GAP_ADDRESSES,
      activeQiWalletGapAddresses,
    };
  }

  export function setActiveQiWalletChangeAddresses(activeQiWalletChangeAddresses: NeuteredAddressInfo[]) {
    return {
      type: types.SET_ACTIVE_QI_WALLET_CHANGE_ADDRESSES,
      activeQiWalletChangeAddresses,
    };
  }

  export function setActiveQiWalletPaymentCode(activeQiWalletPaymentCode: string) {
    return {
      type: types.SET_ACTIVE_QI_WALLET_PAYMENT_CODE,
      activeQiWalletPaymentCode,
    };
  }

  export function setActiveQiWalletZone(activeQiWalletAddressZone: string) {
    return {
      type: types.SET_ACTIVE_QI_WALLET_ZONE,
      activeQiWalletAddressZone,
    };
  }

  export function setActiveQiWalletBalance(activeQiWalletAddressBalance: number){
    return {
      type: types.SET_ACTIVE_QI_WALLET_BALANCE,
      activeQiWalletAddressBalance,
    };
  }

  export function setActiveQiWalletSpendableBalance(activeQiWalletSpendableBalance: number){
    return {
      type: types.SET_ACTIVE_QI_WALLET_SPENDABLE_BALANCE,
      activeQiWalletSpendableBalance,
    };
  }

  export function setActiveQiWalletLockedBalance(activeQiWalletLockedBalance: number){
    return {
      type: types.SET_ACTIVE_QI_WALLET_LOCKED_BALANCE,
      activeQiWalletLockedBalance,
    };
  }

  export function setActiveQiWalletTransactions(activeQiWalletTransactions: Transaction[]){
    return {
      type: types.SET_ACTIVE_QI_WALLET_TRANSACTIONS,
      activeQiWalletTransactions,
    };
  } 


  export function sendQiTransaction(txData: ISendTransaction){
    return {
      type: types.SEND_QI_TRANSACTION,
      payload: txData,
    };
  }
