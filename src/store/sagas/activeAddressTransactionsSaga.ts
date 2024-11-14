import { put, call, select, delay} from 'redux-saga/effects';

import { IActiveWalletAddressState } from "../models/reducers/wallet";

import {getTransactionsFromBlockscout} from 'src/quai-mdk/blockscout';
import * as walletActions from 'src/store/actions/walletActions';
import { Zone } from 'src/types';
import { TransactionList } from 'src/quai-mdk/blockscout';
interface IState {
    activeWalletReducer: IActiveWalletAddressState;
  }

const activeWalletState = (state: IState) => state.activeWalletReducer;

// Our worker Saga that fetches the balance
export default function* fetchActiveWalletAddressTransactions(action:any) {
    
    console.log('fetch transactions saga started');
    let activeAddressData: IActiveWalletAddressState = yield select(activeWalletState);
    const activeAddress = activeAddressData.activeWalletAddress;
    const activeZone = activeAddressData.activeWalletAddressZone;
    console.log('fetching balance for address, zone:', activeAddress, activeZone);
    let activeZoneT = Zone['zone-0-0']
    //if(activeZone)
    //{
    //activeZoneT = stringToZone(activeZone);
    //}
if(activeAddress){
    const tx:TransactionList = yield call(
    () => new Promise((resolve) => {
        getTransactionsFromBlockscout(activeAddress).then((_result) => {
            console.log('saga get transactions result', _result);
            //process here
            resolve(_result);
        });
    })
    )
    console.log('Active Address Transactions Saga returned', tx);
    yield put(walletActions.setActiveWalletTransactions(tx.result));
    }
};