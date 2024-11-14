import { put, call, select} from 'redux-saga/effects';

import { IActiveQiWalletAddressState, IActiveWalletAddressState, IPrimaryQiWalletState, IPrimaryWalletState } from "../models/reducers/wallet";

import { QiHDWallet, QuaiHDWallet, quais, TransactionResponse, Wallet } from 'quais';
import * as txActions from 'src/store/actions/txActions';

import { Currency} from 'src/types';

import { RootNavigator } from 'src/navigation/utils';
import { TxStatus } from 'src/components/TxStatusIndicator';
import {store} from '../index';
import { deserializeQiHDWallet, registerQiPaymentCode } from 'src/quai-mdk/qiHDWallet';
import { deSerializeHDWallet } from 'src/quai-mdk/quaiHDWallet';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';
import { ISendTransaction } from '../models/actions/wallet';

interface IState {
    activeQiWalletReducer: IActiveQiWalletAddressState;
    primaryQiWalletReducer: IPrimaryQiWalletState;
    primaryWalletReducer: IPrimaryWalletState;
    activeWalletReducer: IActiveWalletAddressState
  }

  const primaryQiWalletState = (state: IState) => state.primaryQiWalletReducer;
  const primaryWalletState = (state: IState) => state.primaryWalletReducer;
  const activeWalletAddressState = (state: IState) => state.activeWalletReducer;
// Our worker Saga
export default function* sendQiTransaction(action:any) {
    const inputData:ISendTransaction = action.payload;
    let to: string = inputData.to;
    const from:string = inputData.from;
    const amount:number = Number(inputData.input.value);
    const tip:number = inputData.input.tip ? Number(inputData.input.tip) : 0;
    const sendAmount:bigint = BigInt(amount + tip);
    yield put(txActions.setTxStatus(TxStatus.pending));
    console.log('send transaction started', to, from, amount);
    const zone = quais.Zone.Cyprus1;
    const primaryQiWalletData:IPrimaryQiWalletState = yield select(primaryQiWalletState);
    const primaryWalletData:IPrimaryWalletState = yield select(primaryWalletState);
    const activeWalletData:IActiveWalletAddressState = yield select(activeWalletAddressState);
    let quaiWalletobj = primaryWalletData.primaryWalletObject;
    let walletobj = primaryQiWalletData.primaryQiWalletObject;
    let quaiAddress = activeWalletData.activeWalletAddress;
    if(walletobj){
        console.log('send tx saga has wallet object', walletobj);
        const wallet:QiHDWallet = yield call(
            () => new Promise((resolve) => {
                if(walletobj)
                deserializeQiHDWallet(walletobj).then((_result: unknown) => {
                    resolve(_result)
                });
                else{
                //we'll need to throw an error and/or generate a new wallet here?
                console.log('ERROR: Qi Wallet Not Found In Store');
                }
            })
            );
            const quaiWallet:QuaiHDWallet = yield call(
                () => new Promise((resolve) => {
                    if(quaiWalletobj)
                    deSerializeHDWallet(quaiWalletobj).then((_result: unknown) => {
                        resolve(_result)
                    });
                    else{
                    //we'll need to throw an error and/or generate a new wallet here?
                    console.log('ERROR: Quai Wallet Not Found In Store');
                    }
                })
                );
            const rpcProvider = new quais.WebSocketProvider('wss://rpc.quai.network', undefined, { usePathing: true })
            rpcProvider._waitUntilReady().then(async () => {
            wallet.connect(rpcProvider);
            wallet.sendTransaction(from,sendAmount,zone,zone).then((_result) => {
                console.log(_result);
                const txResponse: TransactionResponse = _result;
                if(txResponse.hash){
                store.dispatch(txActions.setTxStatus(TxStatus.success));
                if(quaiAddress){    
                const privateKey = quaiWallet.getPrivateKey(quaiAddress);
                const wallet = new Wallet(privateKey, rpcProvider)
                registerQiPaymentCode(
                    wallet,
                    from,
                    to,
                )
                }
            }}
            )
            .catch((error) => {
                console.log('Send Transaction Error', error.toString());
                store.dispatch(txActions.setTxErrorMsg(error.toString()))
                store.dispatch(txActions.setTxStatus(TxStatus.failed));
              });
            })
            }   
        
};