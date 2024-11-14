import createReducer from '../createReducer';
import * as types from '../actions/types';
import {IActiveQiWalletAddressState} from '../models/reducers/wallet';
import { ISetActiveQiWalletAddress,
    ISetActiveQiWalletAddressBalance,
    ISetActiveQiWalletAddressZone,
    ISetActiveQiWalletAddresses,
    ISetActiveQiWalletChangeAddresses,
    ISetActiveQiWalletPaymentCode,
    ISetActiveQiWalletTransactions,
    ISetActiveQiWalletNextAddress,
    ISetActiveQiWalletGapAddresses,
    ISetActiveQiWalletAddressSpendableBalance,
    ISetActiveQiWalletAddressLockedBalance,
} from '../models/actions/qiWallet';
import { QiTransaction } from 'quais';

const defaultBalanceValue = 0.00;
const defaultTransactions:QiTransaction[] = []

export const initialActiveQiWalletAddressState: IActiveQiWalletAddressState = {
    activeQiWalletAddress: undefined,
    activeQiWalletNextAddress: undefined,
    activeQiWalletAddresses: undefined,
    activeQiWalletGapAddresses: undefined,
    activeQiWalletChangeAddresses: undefined,
    activeQiWalletAddressZone: undefined,
    activeQiWalletPaymentCode: undefined,
    activeQiWalletAddressBalance: defaultBalanceValue,
    activeQiWalletAddressSpendableBalance: defaultBalanceValue,
    activeQiWalletAddressLockedBalance: defaultBalanceValue,
    activeQiWalletTransactions: defaultTransactions,
  };

  export const activeQiWalletReducer = createReducer(initialActiveQiWalletAddressState, {
  
    [types.SET_ACTIVE_QI_WALLET_ADDRESS](state: IActiveQiWalletAddressState, action: ISetActiveQiWalletAddress) {
      return {
        ...state,
        activeQiWalletAddress: action.activeQiWalletAddress,
      };
    },
  [types.SET_ACTIVE_QI_WALLET_ZONE](state: IActiveQiWalletAddressState, action: ISetActiveQiWalletAddressZone) {
      return {
        ...state,
        activeQiWalletAddressZone: action.activeQiWalletAddressZone,
      };
    },
    [types.SET_ACTIVE_QI_WALLET_NEXT_ADDRESS](state: IActiveQiWalletAddressState, action: ISetActiveQiWalletNextAddress) {
      return {
        ...state,
        activeQiWalletNextAddress: action.activeQiWalletNextAddress,
      };
    },
    [types.SET_ACTIVE_QI_WALLET_ADDRESSES](
        state: IActiveQiWalletAddressState,
        action: ISetActiveQiWalletAddresses,
      ) {
        return {
          ...state,
          activeQiWalletAddresses: action.activeQiWalletAddresses,
        };
      },
    [types.SET_ACTIVE_QI_WALLET_GAP_ADDRESSES](
        state: IActiveQiWalletAddressState,
        action: ISetActiveQiWalletGapAddresses,
      ) {
        return {
          ...state,
          activeQiWalletGapAddresses: action.activeQiWalletGapAddresses,
        };
      },
    [types.SET_ACTIVE_QI_WALLET_CHANGE_ADDRESSES](
        state: IActiveQiWalletAddressState,
        action: ISetActiveQiWalletChangeAddresses,
      ) {
        return {
          ...state,
          activeQiWalletChangeAddresses: action.activeQiWalletChangeAddresses,
        };
      },
    [types.SET_ACTIVE_QI_WALLET_PAYMENT_CODE](
        state: IActiveQiWalletAddressState,
        action: ISetActiveQiWalletPaymentCode,
      ) {
        return {
          ...state,
          activeQiWalletPaymentCode: action.activeQiWalletPaymentCode,
        };
      },
  [types.SET_ACTIVE_QI_WALLET_BALANCE](
    state: IActiveQiWalletAddressState,
    action: ISetActiveQiWalletAddressBalance,
  ) {
    return {
      ...state,
      activeQiWalletAddressBalance: action.activeQiWalletAddressBalance,
    };
  },
  [types.SET_ACTIVE_QI_WALLET_SPENDABLE_BALANCE](
    state: IActiveQiWalletAddressState,
    action: ISetActiveQiWalletAddressSpendableBalance,
  ) {
    return {
      ...state,
      activeQiWalletAddressSpendableBalance: action.activeQiWalletAddressSpendableBalance,
    };
  },
  [types.SET_ACTIVE_QI_WALLET_LOCKED_BALANCE](
    state: IActiveQiWalletAddressState,
    action: ISetActiveQiWalletAddressLockedBalance,
  ) {
    return {
      ...state,
      activeQiWalletAddressLockedBalance: action.activeQiWalletAddressLockedBalance,
    };
  },
  [types.SET_ACTIVE_QI_WALLET_TRANSACTIONS](
    state: IActiveQiWalletAddressState,
    action: ISetActiveQiWalletTransactions,
  ) {
    return {
      ...state,
      activeQiWalletTransactions: action.activeQiWalletTransactions,
    };
  },

});