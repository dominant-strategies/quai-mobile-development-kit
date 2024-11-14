import createReducer from '../createReducer';
import * as types from '../actions/types';
import {IGlobalState} from 'src/store/models/reducers/global';
import { ISetCreateNewWalletActivitySpinner, 
  ISetQiWalletScanInProgress, ISetQiWalletSyncInProgress
} from '../models/actions/global';

export const initialGlobalState: IGlobalState = {
    createNewWalletActivitySpinner: false,
    qiWalletScanInProgress: false,
    qiWalletSyncInProgress: false,
  };

export const globalReducer = createReducer(initialGlobalState, {
    [types.CREATE_NEW_WALLET_ACTIVITY_SPINNER](state: IGlobalState, action: ISetCreateNewWalletActivitySpinner) {
      return {
        ...state,
        createNewWalletActivitySpinner: action.createNewWalletActivitySpinner,
      };
    },
    [types.SET_QI_WALLET_SCAN_IN_PROGRESS](state: IGlobalState, action: ISetQiWalletScanInProgress) {
      return {
        ...state,
        qiWalletScanInProgress: action.qiWalletScanInProgress,
      };
    },
    [types.SET_QI_WALLET_SYNC_IN_PROGRESS](state: IGlobalState, action: ISetQiWalletSyncInProgress) {
      return {
        ...state,
        qiWalletSyncInProgress: action.qiWalletSyncInProgress,
      };
    },
});