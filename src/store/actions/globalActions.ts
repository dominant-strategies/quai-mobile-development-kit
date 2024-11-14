import * as types from './types';

export function setCreateNewWalletActivitySpinner(createNewWalletActivitySpinner: boolean){
    return {
    type: types.CREATE_NEW_WALLET_ACTIVITY_SPINNER,
    createNewWalletActivitySpinner,
    };
  }

export function setQiWalletScanInProgress(qiWalletScanInProgress: boolean){
    return {
    type: types.SET_QI_WALLET_SCAN_IN_PROGRESS,
    qiWalletScanInProgress,
    };
  }

export function setQiWalletSyncInProgress(qiWalletSyncInProgress: boolean){
    return {
    type: types.SET_QI_WALLET_SYNC_IN_PROGRESS,
    qiWalletSyncInProgress,
    };
  }