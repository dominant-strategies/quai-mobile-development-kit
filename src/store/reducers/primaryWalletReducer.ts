import createReducer from '../createReducer';
import * as types from '../actions/types';
import {IPrimaryWalletState} from '../models/reducers/wallet';

import {
   ISetPrimaryWalletObj,
   ISetPrimaryWalletPubAddress,
   ISetPrimaryWalletRegion,
   ISetPrimaryWalletZone,
   ISetPrimaryWalletPkeyName,
   ISetPrimaryWalletPhrase,
   IResetPrimaryWallet,
} from '../models/actions/wallet';

export const initialPrimaryWalletState: IPrimaryWalletState = {
    primaryWalletObject: undefined,
    primaryWalletPublicAddress: 'foo',
    primaryWalletPkeyName: undefined,
    primaryWalletRegion: undefined,
    primaryWalletZone: undefined,
    primaryWalletPhrase: undefined,
  };

export const primaryWalletReducer = createReducer(initialPrimaryWalletState, {
    [types.SET_PRIMARY_WALLET_OBJ](state: IPrimaryWalletState, action: ISetPrimaryWalletObj) {
        return {
          ...state,
          primaryWalletObject: action.primaryWalletObj,
        };
      },
      [types.SET_PRIMARY_WALLET_PUB_ADDR](state: IPrimaryWalletState, action: ISetPrimaryWalletPubAddress) {
        return {
          ...state,
          primaryWalletPublicAddress: action.primaryWalletPubAddress,
        };
      },
    [types.SET_PRIMARY_WALLET_REGION](state: IPrimaryWalletState, action: ISetPrimaryWalletRegion) {
        return {
          ...state,
          primaryWalletRegion: action.primaryWalletRegion,
        };
      },
    [types.SET_PRIMARY_WALLET_ZONE](state: IPrimaryWalletState, action: ISetPrimaryWalletZone) {
      return {
        ...state,
        primaryWalletZone: action.primaryWalletZone,
      };
    },
    [types.SET_PRIMARY_WALLET_PKEY_NAME](
      state: IPrimaryWalletState,
      action: ISetPrimaryWalletPkeyName,
    ) {
      return {
        ...state,
        primaryWalletPkeyName: action.primaryWalletPkeyName,
      };
    },
    [types.SET_PRIMARY_WALLET_PHRASE](
      state: IPrimaryWalletState,
      action: ISetPrimaryWalletPhrase,
    ) {
      return {
        ...state,
        primaryWalletPhrase: action.primaryWalletPhrase,
      };
    },
    [types.RESET_PRIMARY_WALLET](
        state: IPrimaryWalletState,
        action: IResetPrimaryWallet,
      ) {
        if(action.resetPrimaryWallet){
        return {
          ...state,
          primaryWalletObject: undefined,
          primaryWalletPublicAddress: undefined,
          primaryWalletPkeyName: undefined,
          primaryWalletRegion: undefined,
          primaryWalletZone: undefined,
        };
        }
        else{
        return {
         ...state,
        }
        }
      },
  });