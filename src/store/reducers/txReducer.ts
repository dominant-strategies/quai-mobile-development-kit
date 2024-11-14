import createReducer from '../createReducer';
import * as types from '../actions/types';
import { ITxState } from '../models/reducers/tx';
import { ISetTxError, ISetTxErrorMsg, ISetTxStatus } from '../models/actions/tx';
import { TxStatus } from 'src/components/TxStatusIndicator';

const initialState: ITxState = {
  txStatus: TxStatus.pending,
  txError: false,
  txErrorMsg: '',
};

export const txReducer = createReducer(initialState, {
    [types.SET_TX_STATUS](state: ITxState, action: ISetTxStatus) {
        return {
          ...state,
          txStatus: action.txStatus,
        };
      },
    [types.SET_TX_ERROR](state: ITxState, action: ISetTxError) {
        return {
          ...state,
          txError: action.txError,
        };
      },
    [types.SET_TX_ERROR_MSG](state: ITxState, action: ISetTxErrorMsg) {
        return {
          ...state,
          txErrorMsg: action.txErrorMsg,
        };
      },

  });
