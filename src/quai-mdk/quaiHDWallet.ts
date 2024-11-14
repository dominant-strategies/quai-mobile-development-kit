import { NeuteredAddressInfo } from "quais/lib/commonjs/wallet/hdwallet";
import { KeychainItemT, QuaiTxRequestData } from "./types";
import { QuaiHDWallet, Zone, quais } from "quais";
import { retrieveStoredKey, storeKey } from "./keyStore";
import { IPrimaryWalletState } from "../store/models/reducers/wallet";
import { useSelector } from "react-redux";
import { QuaiTransactionRequest } from "quais/lib/commonjs/providers";
import { getProvider, getWebSocketsProvider } from "./quaiProviders";
import { entropyToMnemonic } from "bip39";
import { Buffer } from "buffer";
import { SerializedQuaiHDWallet } from "quais/lib/commonjs/wallet/quai-hdwallet";

interface state {
    primaryWalletReducer: IPrimaryWalletState;
  };
const generateSecureRandom = (size: number) => {
    let uint8 = new Uint8Array(size);
    uint8 = uint8.map(() => Math.floor(Math.random() * 90) + 10);
    console.log('SECURE RANDOM', uint8);
    return uint8;
  };

  const getSeedPhraseFromEntropy = async (entropy: string) => {
    try {
      const mnemonic = await entropyToMnemonic(entropy);
      console.log(mnemonic);
      return mnemonic;
    } catch(error) {
      console.log('seed error',error)
      return undefined;
    }
  };

export async function generateSeedPhrase() {
  try {
   const input = await generateSecureRandom(32);
   const output = await getSeedPhraseFromEntropy(
    Buffer.from(input).toString('hex'),
  );
  console.log('NEW SEED PHRASE', output);
   } catch(e) {
    console.log(e);
    return false
    }
    const phrase: string = 'pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter'
    return phrase;
}
export async function createHDWalletFromSeed(seedPhrase:string, walletName: string) {

// initialize HD wallet from mnemonic
const mnemonic = quais.Mnemonic.fromPhrase(seedPhrase)
const quaiWallet: QuaiHDWallet = quais.QuaiHDWallet.fromMnemonic(mnemonic)
 return quaiWallet;
}

export async function createHDWalletFromRandom( walletName: string) {

  // initialize HD wallet from random seed;
  const quaiWallet: QuaiHDWallet = quais.QuaiHDWallet.createRandom();
   return quaiWallet;
  }

export async function serializeHDWallet(wallet: QuaiHDWallet){
    const serializedWallet = wallet.serialize();
    return serializedWallet;
}

export async function deSerializeHDWallet(wallet: SerializedQuaiHDWallet){
    const deserializedWallet = quais.QuaiHDWallet.deserialize(wallet)
    return deserializedWallet;
}

export async function setPrivateKeyForWallet(walletID:string, privateKey: string){
    const keychainKey = `PKEY-${walletID}`
    const keyData: KeychainItemT = {
        key: keychainKey,
        value: privateKey,
    }
    let res = await storeKey(keyData, true);
    return res;
}

export async function getPrivateKeyForWallet(walletID: string){
    const keychainKey = `PKEY-${walletID}`
    let res = await retrieveStoredKey(keychainKey)
    return res;
}
export async function initWalletFromStore() {
  const serWallet = useSelector((state: state) => (state.primaryWalletReducer.primaryWalletObject));
  if(!serWallet)
    {
      return 'Wallet not found';
    }
  return new Promise((resolve, reject) => {
    QuaiHDWallet.deserialize(serWallet).then(async (value) => {
        resolve(value);
      })
      .catch(error => {
        console.log('Error Retrieving Wallet: ', error);
        reject(error);
      });
    });
    };

  export async function getAddressForZone(zone: Zone) {
    const res = await initWalletFromStore();
    if(res instanceof QuaiHDWallet)
      {
       const addressInfo:NeuteredAddressInfo[] = res.getAddressesForZone(zone);
       const firstAddr = addressInfo[0].address;
       return firstAddr
      }
    if(res instanceof Error)
      {
        return res.message;
      }
  }

  export async function sendQuaiTransaction(txRequestPacket: QuaiTxRequestData) {
    return new Promise((resolve, reject) => {
      const hdWallet = txRequestPacket.wallet;
      const txData:QuaiTransactionRequest = {
        from: txRequestPacket.fromAddress,
        to: txRequestPacket.toAddress,
        value: txRequestPacket.value,
      };
        const provider = getProvider(txRequestPacket.zone);
        provider._waitUntilReady().then(async () => {
          hdWallet.connect(provider);
          hdWallet.sendTransaction(txData)
          .then(txResponse => {
            console.log('Transaction hash: ', txResponse);
            resolve(txResponse);
          })
          .catch(error => {
            console.log('Transaction error: ', error);
            reject(error);
          });
        });
      })   
}

export const waitForTransaction = async (
  confirms: number,
  txHash: string,
  zone: Zone,
): Promise<quais.TransactionReceipt | null> => {
  console.log('wait for transaction zone', zone);
  const provider = getWebSocketsProvider(zone);
  await provider.ready;
  console.log('provider ready')
  const txReceipt = await provider.waitForTransaction(
    txHash,
    confirms,
  );
  console.log(txReceipt);
  return txReceipt;
};


