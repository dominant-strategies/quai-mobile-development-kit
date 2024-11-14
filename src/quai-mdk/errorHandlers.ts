import { useDispatch } from "react-redux";
import { TxStatus } from "src/components/TxStatusIndicator";
import * as txActions from 'src/store/actions/txActions';

export function useHandleTxSendError(
    txError: boolean, 
    TxErrorMessage: string,
) {
const dispatch = useDispatch();
    dispatch(txActions.setTxError(txError));
    dispatch(txActions.setTxErrorMsg(TxErrorMessage));
    dispatch(txActions.setTxStatus(TxStatus.failed));
 console.log('handleTXError Called', txError, TxErrorMessage)
}


export const clearTxSendError = () => {
    const dispatch = useDispatch();
    dispatch(txActions.setTxError(false));
    dispatch(txActions.setTxErrorMsg(''));
}