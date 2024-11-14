/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as themeReducer from './themeReducer';
import * as userProfileReducer from './userProfileReducer';
import * as primaryWalletReducer from './primaryWalletReducer';
import * as activeWalletReducer from './activeWalletReducer';
import * as primaryQiWalletReducer from './primaryQiWalletReducer';
import * as activeQiWalletReducer from './activeQiWalletReducer';
import * as txReducer from './txReducer';
import * as globalReducer from './globalReducer';
import * as contactsReducer from './contactsReducer';

export default Object.assign(
    loginReducer, 
    loadingReducer,
    themeReducer,
    userProfileReducer,
    primaryWalletReducer,
    activeWalletReducer,
    txReducer,
    globalReducer,
    primaryQiWalletReducer,
    activeQiWalletReducer,
    contactsReducer,
);