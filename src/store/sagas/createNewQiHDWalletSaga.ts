import { put, call, select } from 'redux-saga/effects';

import { createQiHDWalletFromRandom, createQiHDWalletFromSeed, serializeQiHDWallet} from 'src/quai-mdk/qiHDWallet';
import { QiHDWallet, SerializedQiHDWallet, quais } from 'quais';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';
import * as globalActions from 'src/store/actions/globalActions';

import { RootNavigator } from 'src/navigation/utils';
import { IActiveWalletAddressState, IPrimaryWalletState } from '../models/reducers/wallet';

interface IState {
    activeWalletReducer: IActiveWalletAddressState;
    primaryWalletReducer: IPrimaryWalletState;
  }

const primaryWalletState = (state: IState) => state.primaryWalletReducer;

// Our worker Saga that creates a new Qi HD Wallet and serializes it to the redux store.
export default function* createNewQiHDWallet(action:any) {
    console.log('create new Qi HD Wallet Saga started');
    const primaryWalletData:IPrimaryWalletState = yield select(primaryWalletState);
    const quaiPhrase = primaryWalletData.primaryWalletPhrase;
   // yield put(walletActions.setCreateNewWalletActivitySpinner(true));
    const walletName = "Default";
    const newWallet:QiHDWallet = yield call(
    () => new Promise((resolve) => {
        if(quaiPhrase === undefined){
        createQiHDWalletFromRandom().then((_result) => {
            resolve(_result)
        });
        }
        else{
        createQiHDWalletFromSeed(quaiPhrase).then((_result) => {
            resolve(_result)
           });
        }
    })
    );
    const paymentCode = newWallet.getPaymentCode();
    const serializedWallet:SerializedQiHDWallet = yield call(
        () => new Promise((resolve) => {
            serializeQiHDWallet(newWallet).then((_result: unknown) => {
                resolve(_result)
            });
        })
        );

    const primaryAddress:string = newWallet.xPub;
    yield put(qiWalletActions.setPrimaryQiWalletAddress(primaryAddress));
    yield put(qiWalletActions.setPrimaryQiWalletPhrase(serializedWallet.phrase));
    yield put(qiWalletActions.setPrimaryQiWalletObject(serializedWallet));
    yield put(qiWalletActions.setActiveQiWalletZone(quais.Zone.Cyprus1.toString()));
    yield put(qiWalletActions.setActiveQiWalletAddress(primaryAddress));
    yield put(qiWalletActions.setActiveQiWalletPaymentCode(paymentCode));
    yield put(qiWalletActions.setActiveQiWalletTransactions([]));
    console.log('Create New Qi HD Wallet Completed, Wallet has been generated', serializedWallet);
    yield put(globalActions.setCreateNewWalletActivitySpinner(false));
    RootNavigator.nameAndPFP();
};