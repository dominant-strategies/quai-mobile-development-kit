import { Contract, QiHDWallet, SerializedQiHDWallet, Wallet, quais } from "quais";
import { MAILBOX_INTERFACE } from "./contracts/payment-channel-mailbox";
import { MAILBOX_CONTRACT_ADDRESS } from "src/constants/quais";

export async function createQiHDWalletFromRandom() {

    // initialize HD wallet from random seed;
    const qiWallet: QiHDWallet = quais.QiHDWallet.createRandom();
     return qiWallet;
 }

export async function createQiHDWalletFromSeed(seedPhrase:string) {

    // initialize Qi HD wallet from mnemonic
    const mnemonic = quais.Mnemonic.fromPhrase(seedPhrase)
    const qiWallet: QiHDWallet = quais.QiHDWallet.fromMnemonic(mnemonic)
    return qiWallet;
}

export async function serializeQiHDWallet(wallet: QiHDWallet){
    const serializedQiWallet: SerializedQiHDWallet = wallet.serialize();
    return serializedQiWallet;
}

export async function deserializeQiHDWallet(wallet: SerializedQiHDWallet){
    const deserializedWallet = quais.QiHDWallet.deserialize(wallet);
    return deserializedWallet;
}

export async function registerQiPaymentCode(
    wallet: Wallet,
    senderPaymentCode: string,
    receiverPaymentCode: string,
    minerTip?: bigint | null
    )
    {
    try{
    const mailboxContract = new Contract(
        MAILBOX_CONTRACT_ADDRESS,
        MAILBOX_INTERFACE,
        wallet,
      )
      const gasOptions = minerTip ? { minerTip } : {}
      const tx = await mailboxContract.notify(
        senderPaymentCode,
        receiverPaymentCode,
        gasOptions
      )
      await tx.wait()
    } catch (error) {
      console.log("Error occurs while notifying Qi recipient", error)
    }
}

        