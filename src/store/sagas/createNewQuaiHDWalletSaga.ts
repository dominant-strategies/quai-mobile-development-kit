import { put, call } from 'redux-saga/effects';

import { IUserProfileState } from "../models/reducers/userProfile";
import { createHDWalletFromRandom, serializeHDWallet} from 'src/quai-mdk/quaiHDWallet';
import { QuaiHDWallet, quais } from 'quais';
import * as walletActions from 'src/store/actions/walletActions';
import * as globalActions from 'src/store/actions/globalActions';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';

import { NeuteredAddressInfo, SerializedHDWallet } from 'quais/lib/commonjs/wallet/hdwallet';

interface IState {
    userProfileReducer: IUserProfileState;
  }

const userProfileState = (state: IState) => state.userProfileReducer;

// Our worker Saga that creates a new Quai HD Wallet and serializes it to the redux store.
export default function* createNewQuaiHDWallet(action:any) {
    console.log('create new Quai HD Wallet Saga started');
    yield put(globalActions.setCreateNewWalletActivitySpinner(true));
    const walletID = "000"; // create a function to get the latest sequential number
    const walletName = "Default";
    const newWallet:QuaiHDWallet = yield call(
    () => new Promise((resolve) => {
        createHDWalletFromRandom(walletName).then((_result) => {
            resolve(_result)
        });
    })
    );
    const addressInfo:NeuteredAddressInfo = yield call(
        () => new Promise((resolve) => {
            newWallet.getNextAddress(0, quais.Zone.Cyprus1).then((_result) => {
                resolve(_result) 
        })
    })
    );

    const serializedWallet:SerializedHDWallet = yield call(
        () => new Promise((resolve) => {
            serializeHDWallet(newWallet).then((_result) => {
                resolve(_result)
            });
        })
        );

    const primaryAddress:string = addressInfo.address;
    yield put(walletActions.setActiveWalletAddress(primaryAddress));
    yield put(walletActions.setPrimaryWalletPhrase(serializedWallet.phrase));
    yield put(walletActions.setActiveWalletZone(quais.Zone.Cyprus1.toString()));
    yield put(walletActions.setPrimaryWalletPubAddress(primaryAddress));
    yield put(walletActions.setPrimaryWalletZone(quais.Zone.Cyprus1.toString()));

    yield put(walletActions.setPrimaryWalletObject(serializedWallet));
    console.log('Create New Quai HD Wallet Completed, Wallet has been generated', serializedWallet);
    yield put(qiWalletActions.createNewQiHDWallet());
};
