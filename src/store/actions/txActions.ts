import { TxStatus } from 'src/components/TxStatusIndicator';
import * as types from './types';

export function setTxStatus(txStatus: TxStatus) {
    return {
      type: types.SET_TX_STATUS,
      txStatus,
    };
  }

export function setTxError(txError: boolean) {
    return {
      type: types.SET_TX_ERROR,
      txError,
    };
  }

  export function setTxErrorMsg(txErrorMsg: string) {
    return {
      type: types.SET_TX_ERROR_MSG,
      txErrorMsg,
    };
  }