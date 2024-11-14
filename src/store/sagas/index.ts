/**
 *  Redux saga class init
 */
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import createNewQuaiHDWallet from './createNewQuaiHDWalletSaga';
import fetchActiveWalletAddressBalance from './activeAddressBalanceSaga';
import fetchActiveWalletAddressTransactions from './activeAddressTransactionsSaga';
import sendQuaiTransaction from './sendQuaiTransactionSaga';
import recoverQuaiHDWallet from './recoverQuaiHDWalletSaga';
import createNewQiHDWallet from './createNewQiHDWalletSaga';
import recoverQiHDWallet from './recoverQiHDWalletSaga';
import scanQiHDWallet from './scanQiHDWalletSaga';
import syncQiHDWallet from './syncQiWalletSaga';
import sendQiTransaction from './sendQiTransactionSaga';

export default function* watch() {
  yield all([takeEvery(types.CREATE_NEW_QUAI_HD_WALLET, createNewQuaiHDWallet)])
  yield all([takeEvery(types.CREATE_NEW_QI_HD_WALLET, createNewQiHDWallet)])
  yield all([takeLatest(types.RECOVER_QUAI_HD_WALLET, recoverQuaiHDWallet)])
  yield all([takeLatest(types.RECOVER_QI_HD_WALLET, recoverQiHDWallet)])
  yield all([takeLatest(types.FETCH_ACTIVE_WALLET_BALANCE, fetchActiveWalletAddressBalance)])
  yield all([takeLatest(types.FETCH_ACTIVE_WALLET_TRANSACTIONS, fetchActiveWalletAddressTransactions)])
  yield all([takeLatest(types.SCAN_QI_WALLET, scanQiHDWallet)])
  yield all([takeLatest(types.SYNC_QI_WALLET, syncQiHDWallet)])
  yield all([takeEvery(types.SEND_QUAI_TRANSACTION, sendQuaiTransaction)])
  yield all([takeEvery(types.SEND_QI_TRANSACTION, sendQiTransaction)])
}