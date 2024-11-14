import { put, call, select, delay} from 'redux-saga/effects';

import { IActiveWalletAddressState } from "../models/reducers/wallet";

import {getBalance} from 'src/quai-mdk/blockscout';
import { quais } from 'quais';
import * as walletActions from 'src/store/actions/walletActions';
import { Zone } from 'src/types';
interface IState {
    activeWalletReducer: IActiveWalletAddressState;
  }

const activeWalletState = (state: IState) => state.activeWalletReducer;

// Our worker Saga that fetches the balance
export default function* fetchActiveWalletAddressBalance(action:any) {
    
    console.log('fetch balance saga started');
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
    const balance:string = yield call(
    () => new Promise((resolve) => {
        getBalance(activeAddress, activeZoneT).then((_result) => {
            console.log('saga get balance result', _result);
            const formattedBalance = Number(quais.formatQuai(_result)).toFixed(3);
            resolve(formattedBalance);
        });
    })
    )
    console.log('Active Address Balance Saga returned', balance);
    const activeWalletAddressBalance = balance
    yield put(walletActions.setActiveWalletBalance(activeWalletAddressBalance));
}
};

