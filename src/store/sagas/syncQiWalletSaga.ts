import { put, call, select, delay} from 'redux-saga/effects';

import { IActiveQiWalletAddressState,IPrimaryQiWalletState} from "../models/reducers/wallet";

import { QiHDWallet, quais } from 'quais';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';
import * as globalActions from 'src/store/actions/globalActions';

import {store} from '../index';
import { deserializeQiHDWallet } from 'src/quai-mdk/qiHDWallet';

interface IState {
    activeQiWalletReducer: IActiveQiWalletAddressState;
    primaryQiWalletReducer: IPrimaryQiWalletState;
  }

  const primaryQiWalletState = (state: IState) => state.primaryQiWalletReducer;

// Our worker Saga that syncs the Qi Wallet UTXO state
export default function* syncQiHDWallet(action:any) {
    console.log('Sync Qi HD Wallet started');
    yield put(globalActions.setQiWalletSyncInProgress(true));
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
        const provider = new quais.JsonRpcProvider('https://rpc.quai.network', undefined, { usePathing: true })
        provider._waitUntilReady().then(async () => {
        wallet.connect(provider);
        wallet.sync(quais.Zone.Cyprus1).then((_result) => {
        //let addresses:QiAddressInfo[] = wallet.getAddressesForZone(zone);
        //let gapAddresses:QiAddressInfo[] = wallet.getGapAddressesForZone(zone);
        //let changeAddresses:QiAddressInfo[] = wallet.getChangeAddressesForZone(zone);
        console.log('sync Qi Wallet Complete');
        const code = wallet.getPaymentCode();
        const balance = wallet.getBalanceForZone(zone);
        console.log('balance for zone', balance);
        let balanceAsNumber = Number(balance);
        walletobj = wallet.serialize();
        //dispatch payment code
        store.dispatch(qiWalletActions.setActiveQiWalletPaymentCode(code));
        store.dispatch(qiWalletActions.setActiveQiWalletBalance(balanceAsNumber));
        store.dispatch(qiWalletActions.setPrimaryQiWalletObject(walletobj));
        store.dispatch(qiWalletActions.setPrimaryQiWalletSynced(true));
        //store.dispatch(qiWalletActions.setActiveQiWalletAddresses(addresses));
        //store.dispatch(qiWalletActions.setActiveQiWalletGapAddresses(gapAddresses));
        //store.dispatch(qiWalletActions.setActiveQiWalletChangeAddresses(changeAddresses));
        store.dispatch(globalActions.setQiWalletSyncInProgress(false));
        })
        .catch((error) => {
            console.log('Sync Error', error.toString());
            store.dispatch(qiWalletActions.setPrimaryQiWalletSynced(false));
            store.dispatch(globalActions.setQiWalletSyncInProgress(false));
          });
        })
        }   
};