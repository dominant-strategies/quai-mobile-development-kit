import { put, call, select, delay} from 'redux-saga/effects';

import { createQiHDWalletFromSeed, serializeQiHDWallet } from 'src/quai-mdk/qiHDWallet';
import { QiHDWallet, SerializedQiHDWallet, quais } from 'quais';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';
import * as globalActions from 'src/store/actions/globalActions';
import { RootNavigator } from 'src/navigation/utils';

// Our worker Saga that recovers a Qi HD Wallet from a seedphrase and serializes it to the redux store.
export default function* recoverQiHDWallet(action:any) {
    const seedPhrase = action.seedPhrase;
    console.log('Recover Qi HD Wallet Saga started with phrase', seedPhrase);
    const newWallet:QiHDWallet = yield call(
    () => new Promise((resolve) => {
        createQiHDWalletFromSeed(seedPhrase).then((_result) => {
            resolve(_result)
        });
    })
    );
    const primaryAddress:string = newWallet.xPub;
    const paymentCode = newWallet.getPaymentCode();
    const serializedWallet:SerializedQiHDWallet = yield call(
        () => new Promise((resolve) => {
            serializeQiHDWallet(newWallet).then((_result) => {
                resolve(_result)
            });
        })
        );
    yield put(qiWalletActions.setPrimaryQiWalletAddress(primaryAddress));
    yield put(qiWalletActions.setPrimaryQiWalletObject(serializedWallet));
    yield put(qiWalletActions.setPrimaryQiWalletPhrase(seedPhrase));
    yield put(qiWalletActions.setActiveQiWalletZone(quais.Zone.Cyprus1.toString()));
    yield put(qiWalletActions.setActiveQiWalletAddress(primaryAddress));
    yield put(qiWalletActions.setActiveQiWalletPaymentCode(paymentCode));
    yield put(qiWalletActions.setActiveQiWalletTransactions([]));
    console.log('Recover Qi HD Wallet Completed, Wallet has been generated', serializedWallet);
    yield put(globalActions.setCreateNewWalletActivitySpinner(false));
    RootNavigator.nameAndPFP();
};