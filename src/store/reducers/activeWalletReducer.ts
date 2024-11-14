import createReducer from '../createReducer';
import * as types from '../actions/types';
import {IActiveWalletAddressState} from '../models/reducers/wallet';

import {
   ISetActiveWalletAddress,
   ISetActiveWalletAddressZone,
   ISetActiveWalletAddressBalance,
   ISetActiveWalletTransactions,
} from '../models/actions/wallet';

export const initialActiveWalletAddressState: IActiveWalletAddressState = {
    activeWalletAddress: undefined,
    activeWalletAddressZone: undefined,
    activeWalletAddressBalance: '0.000',
    activeWalletTransactions: [],
  };

export const activeWalletReducer = createReducer(initialActiveWalletAddressState, {
      [types.SET_ACTIVE_WALLET_ADDRESS](state: IActiveWalletAddressState, action: ISetActiveWalletAddress) {
        return {
          ...state,
          activeWalletAddress: action.activeWalletAddress,
        };
      },
    [types.SET_ACTIVE_WALLET_ZONE](state: IActiveWalletAddressState, action: ISetActiveWalletAddressZone) {
        return {
          ...state,
          activeWalletAddressZone: action.activeWalletAddressZone,
        };
      },
    [types.SET_ACTIVE_WALLET_BALANCE](
      state: IActiveWalletAddressState,
      action: ISetActiveWalletAddressBalance,
    ) {
      console.log('activeWalletReducer', action.activeWalletAddressBalance);
      return {
        ...state,
        activeWalletAddressBalance: action.activeWalletAddressBalance,
      };
    },
    [types.SET_ACTIVE_WALLET_TRANSACTIONS](
      state: IActiveWalletAddressState,
      action: ISetActiveWalletTransactions,
    ) {
      console.log('activeWalletReducer', action.activeWalletTransactions);
      return {
        ...state,
        activeWalletTransactions: action.activeWalletTransactions,
      };
    },

  });