import { put, call, select, delay} from 'redux-saga/effects';

import { IActiveQiWalletAddressState,IPrimaryQiWalletState} from "../models/reducers/wallet";

import { QiHDWallet, quais } from 'quais';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';
import * as globalActions from 'src/store/actions/globalActions';

import {store} from '../index';
import { deserializeQiHDWallet } from 'src/quai-mdk/qiHDWallet';
import { bigIntToDecimal } from 'src/quai-mdk/utils';

interface IState {
    activeQiWalletReducer: IActiveQiWalletAddressState;
    primaryQiWalletReducer: IPrimaryQiWalletState;
  }

  const primaryQiWalletState = (state: IState) => state.primaryQiWalletReducer;

// Our worker Saga that syncs the Qi Wallet UTXO state
export default function* scanQiWallet(action:any) {
    console.log('Scan Qi Wallet started');
    yield put(globalActions.setQiWalletScanInProgress(true));
    const zone = quais.Zone.Cyprus1;
    const primaryQiWalletData:IPrimaryQiWalletState = yield select(primaryQiWalletState);
    let walletobj = primaryQiWalletData.primaryQiWalletObject;
    if(walletobj){
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
        const provider = new quais.WebSocketProvider('wss://rpc.quai.network', undefined, { usePathing: true })
        provider._waitUntilReady().then(async () => {
        wallet.connect(provider);
        wallet.scan(quais.Zone.Cyprus1).then((_result) => {
        //let addresses:QiAddressInfo[] = wallet.getAddressesForZone(zone);
        //let gapAddresses:QiAddressInfo[] = wallet.getGapAddressesForZone(zone);
        //let changeAddresses:QiAddressInfo[] = wallet.getChangeAddressesForZone(zone);
        const code = wallet.getPaymentCode();
        const balance = wallet.getBalanceForZone(zone);
        wallet.getNextAddress(0,zone).then((_result) => {
        console.log('next Address',_result.address);
        store.dispatch(qiWalletActions.setActiveQiWalletNextAddress(_result.address));
        })
        console.log('balance for zone', balance);
        const decimalBalance:string = bigIntToDecimal(balance);
        const numBalance = Number(balance);
        const resolvedBalance = numBalance / 1000;
        console.log('decimal balance', resolvedBalance);
        let numericBalance:number = Number(decimalBalance);
        walletobj = wallet.serialize();
        //dispatch payment code
        store.dispatch(qiWalletActions.setActiveQiWalletPaymentCode(code));
        store.dispatch(qiWalletActions.setActiveQiWalletBalance(resolvedBalance));
        store.dispatch(qiWalletActions.setPrimaryQiWalletObject(walletobj));
        store.dispatch(qiWalletActions.setPrimaryQiWalletScanned(true));
        //store.dispatch(qiWalletActions.setActiveQiWalletAddresses(addresses));
        //store.dispatch(qiWalletActions.setActiveQiWalletGapAddresses(gapAddresses));
        //store.dispatch(qiWalletActions.setActiveQiWalletChangeAddresses(changeAddresses));
        console.log('scan Qi HDWallet Complete');
        store.dispatch(globalActions.setQiWalletScanInProgress(false));
        })
        .catch((error) => {
            console.log('Scan Error', error.toString());
            store.dispatch(qiWalletActions.setPrimaryQiWalletScanned(false));
        store.dispatch(globalActions.setQiWalletScanInProgress(false));
          });
        })
        }   
};