import { put, call, select, delay} from 'redux-saga/effects';

import { IActiveWalletAddressState, IPrimaryWalletState } from "../models/reducers/wallet";

import {getBalance, getTransactionsFromBlockscout} from 'src/quai-mdk/blockscout';
import { defaultZone, stringToZone } from 'src/quai-mdk/zoneUtil';
import { QuaiHDWallet, QuaiTransaction, quais } from 'quais';
import * as walletActions from 'src/store/actions/walletActions';
import * as txActions from 'src/store/actions/txActions';

import { Currency, Zone } from 'src/types';

import { QuaiTransactionRequest, QuaiTransactionResponse, TransactionResponse } from 'quais/lib/commonjs/providers';
import {utils} from 'web3';
import { RootNavigator } from 'src/navigation/utils';
import { TxStatus } from 'src/components/TxStatusIndicator';
import {store} from '../index';
import { ISendTransaction } from '../models/actions/wallet';
import { input } from 'src/quai-mdk/types';

interface IState {
    activeWalletReducer: IActiveWalletAddressState;
    primaryWalletReducer: IPrimaryWalletState;
  }

  const primaryWalletState = (state: IState) => state.primaryWalletReducer;

// Our worker Saga that fetches the balance
export default function* sendQuaiTransaction(action:any) {
    yield put(txActions.setTxStatus(TxStatus.ready));
    let inputData:ISendTransaction = action.payload;

    console.log('send transaction started', inputData);
    let toAddressLC = inputData.to.toLowerCase();
    let toAddressCS = utils.toChecksumAddress(toAddressLC);
    console.log('saga checksum address to', toAddressCS);
    inputData.to = toAddressCS;
    const primaryWalletData:IPrimaryWalletState = yield select(primaryWalletState);
    let walletobj = primaryWalletData.primaryWalletObject;
    let txResultStatus = TxStatus.processing;
    if(walletobj){
        console.log('send tx saga has wallet object', walletobj);
        const wallet:QuaiHDWallet = yield call(
            () => new Promise((resolve) => {
                QuaiHDWallet.deserialize(walletobj).then((_result) => {
                    console.log('send tx saga has de-serialized the wallet', _result);
                    resolve(_result);
                });
            })
            )
        let value:string = quais.parseQuai(inputData.input.value).toString();
        let txData:QuaiTransactionRequest = {
            from: inputData.from,
            to: inputData.to,
            value,
            };
        console.log('tx send saga, tx data', txData);
        const provider = new quais.WebSocketProvider('wss://rpc.quai.network', undefined, { usePathing: true })
        console.log('get provider', provider);
        try{
        provider._waitUntilReady().then(async () => {
        console.log('tx send saga provider is ready');
          wallet.connect(provider);
          console.log('wallet connected', wallet);
          console.log('sendingTransaction', txData);
          wallet.sendTransaction(txData).then((_result) => {
            let TransactionResponse = _result;
            console.log('send tx result', TransactionResponse);
          })
          .catch((error) => {
            //console.log('send tx error', error.toString());
            const errString = error.toString();
            const catchString = "ReferenceError: Can't find variable: structuredClone"
            if(errString === catchString){
                //console.log('error has been caught!');
                txResultStatus = TxStatus.success;
                store.dispatch(txActions.setTxStatus(TxStatus.success));
            }
          })
            })
            .catch((error) =>{
            console.log('provider init error 1', error);
            store.dispatch(txActions.setTxErrorMsg(error.toString()))
            store.dispatch(txActions.setTxStatus(TxStatus.failed));
            });
        }
        catch(error){
            console.log('provider init error 2', error);
        }
        console.log('send tx saga completed', txResultStatus);
    }

};

