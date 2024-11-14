import createReducer from '../createReducer';
import * as types from '../actions/types';
import {IPrimaryQiWalletState} from '../models/reducers/wallet';
import { IResetPrimaryQiWallet, ISetPrimaryQiWalletAddress, ISetPrimaryQiWalletLastSynced, ISetPrimaryQiWalletObj, ISetPrimaryQiWalletPhrase, ISetPrimaryQiWalletScanned, ISetPrimaryQiWalletSynced } from '../models/actions/qiWallet';

export const initialPrimaryQiWalletState: IPrimaryQiWalletState = {
    primaryQiWalletObject: undefined,
    primaryQiWalletAddress: undefined,
    primaryQiWalletPhrase: undefined,
    primaryQiWalletScanned: false,
    primaryQiWalletSynced: false,
    primaryQiWalletLastSynced: undefined
  };

  export const primaryQiWalletReducer = createReducer(initialPrimaryQiWalletState, {

      [types.SET_PRIMARY_QI_WALLET_OBJ](state: IPrimaryQiWalletState, action: ISetPrimaryQiWalletObj) {
          return {
            ...state,
            primaryQiWalletObject: action.primaryQiWalletObj,
          };
        },
        [types.SET_PRIMARY_QI_WALLET_ADDR](state: IPrimaryQiWalletState, action: ISetPrimaryQiWalletAddress) {
          return {
            ...state,
            primaryQiWalletAddress: action.primaryQiWalletAddress,
          };
        },
      [types.SET_PRIMARY_QI_WALLET_PHRASE](
        state: IPrimaryQiWalletState,
        action: ISetPrimaryQiWalletPhrase,
      ) {
        return {
          ...state,
          primaryQiWalletPhrase: action.primaryQiWalletPhrase,
        };
      },
      [types.SET_PRIMARY_QI_WALLET_SCANNED](
        state: IPrimaryQiWalletState,
        action: ISetPrimaryQiWalletScanned,
      ) {
        return {
          ...state,
          primaryQiWalletScanned: action.primaryQiWalletScanned,
        };
      },
      [types.SET_PRIMARY_QI_WALLET_SYNCED](
        state: IPrimaryQiWalletState,
        action: ISetPrimaryQiWalletSynced,
      ) {
        return {
          ...state,
          primaryQiWalletSynced: action.primaryQiWalletSynced,
        };
      },
      [types.SET_PRIMARY_QI_WALLET_LAST_SYNCED](
        state: IPrimaryQiWalletState,
        action: ISetPrimaryQiWalletLastSynced,
      ) {
        return {
          ...state,
          primaryQiWalletLastSynced: action.primaryQiWalletLastSynced,
        };
      },
      [types.RESET_PRIMARY_QI_WALLET](
          state: IPrimaryQiWalletState,
          action: IResetPrimaryQiWallet,
        ) {
          if(action.resetPrimaryQiWallet){
          return {
            ...state,
            primaryQiWalletObject: undefined,
            primaryQiWalletAddress: undefined,
            primaryQiWalletPhrase: undefined,
          };
          }
          else{
          return {
           ...state,
          }
          }
        },
    });
