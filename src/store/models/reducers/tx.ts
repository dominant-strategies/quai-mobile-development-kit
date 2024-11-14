import { TxStatus } from "src/components/TxStatusIndicator";

export interface ITxState {
    txStatus: TxStatus;
    txError: boolean;
    txErrorMsg: string;
  }