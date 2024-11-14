import { TxStatus } from "src/components/TxStatusIndicator";

export interface ISetTxStatus {
    txStatus: TxStatus;
  }

export interface ISetTxError {
    txError: boolean;
}

export interface ISetTxErrorMsg {
    txErrorMsg: string;
}

