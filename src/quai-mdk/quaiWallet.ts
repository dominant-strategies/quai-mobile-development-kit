import { Wallet } from "quais";
import { getProvider } from "./quaiProviders";
import { QuaiWalletT, ZoneT, pKeyT, KeychainItemT } from "./types";
import {generatePKey} from "./keyGen";
import { storeKey } from "./keyStore";

import { useSelector } from 'react-redux';

import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IPrimaryWalletState } from 'src/store/models/reducers/wallet';

interface state {
    userProfileReducer: IUserProfileState;
    primaryWalletReducer: IPrimaryWalletState;
  };

export async function createWalletForZone(walletID:string, walletName: string, zone: ZoneT) {
    const provider = getProvider(zone);
    const pKeyObj: pKeyT = await generatePKey(); 
    console.log('pKey Generated', pKeyObj.encodedPKey);
    const walletObj = new Wallet(pKeyObj.encodedPKey, provider);
    console.log('new wallet address', walletObj.address)
    const keychainKey = `PKEY-${walletID}`
    const keyData: KeychainItemT = {
        key: keychainKey,
        value: walletObj.privateKey,
    }
    storeKey(keyData, true);
    const wallet: QuaiWalletT = {
        walletID,
        walletName,
        zone,
        pKey: walletObj.privateKey,
        pkeyName:keychainKey,
        address: walletObj.address,
        walletObject: walletObj,
    }
    return wallet;
};

export async function generateNewSeedPhrase(){
    const seedPhraseGenerator = require('./seed-phrase-generator');
    const seedPhrase = seedPhraseGenerator.generateSeedPhrase();
    console.log('new seed phrase', seedPhrase);
    return seedPhrase;
}


export async function getPrimaryWalletObject() {
    const walletObj = useSelector((state: state) => (state.primaryWalletReducer.primaryWalletObject));
    if(walletObj){
    return walletObj;
    }
    return Error('wallet could not be found');
};


