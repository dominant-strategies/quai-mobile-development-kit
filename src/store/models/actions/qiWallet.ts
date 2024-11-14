import { SerializedQiHDWallet } from "quais";
import { NeuteredAddressInfo } from "quais/lib/commonjs/wallet/hdwallet";
import { Transaction } from "src/quai-mdk/blockscout";


export interface ISetPrimaryQiWalletObj {
  primaryQiWalletObj: SerializedQiHDWallet;
}

export interface ISetPrimaryQiWalletScanned {
  primaryQiWalletScanned: boolean;
}

export interface ISetPrimaryQiWalletSynced {
  primaryQiWalletSynced: boolean;
}

export interface ISetPrimaryQiWalletLastSynced {
  primaryQiWalletLastSynced: string;
}

export interface ISetPrimaryQiWalletZone {
  primaryQiWalletZone: string;
}

export interface ISetPrimaryQiWalletPhrase{
  primaryQiWalletPhrase: string;
}

export interface ISetActiveQiWalletPaymentCode{
  activeQiWalletPaymentCode: string;
}

export interface IRecoverQiHDWallet{
  seedPhrase: string;
}

export interface IResetPrimaryQiWallet{
  resetPrimaryQiWallet: boolean;
}

export interface ISetPrimaryQiWalletAddress{
  primaryQiWalletAddress: string;
}

export interface ISetActiveQiWalletAddress {
    activeQiWalletAddress: string;
  }

export interface ISetActiveQiWalletNextAddress{
    activeQiWalletNextAddress: NeuteredAddressInfo;
  }
  
  export interface ISetActiveQiWalletAddresses {
      activeQiWalletAddresses: NeuteredAddressInfo[];
  }

  export interface ISetActiveQiWalletGapAddresses {
    activeQiWalletGapAddresses: NeuteredAddressInfo[];
}

  export interface ISetActiveQiWalletChangeAddresses {
    activeQiWalletChangeAddresses: NeuteredAddressInfo[];
}

export interface ISetActiveQiWalletAddressZone{
  activeQiWalletAddressZone: string;
}

export interface ISetActiveQiWalletAddressBalance{
  activeQiWalletAddressBalance: number;
}

export interface ISetActiveQiWalletAddressSpendableBalance{
  activeQiWalletAddressSpendableBalance: number;
}

export interface ISetActiveQiWalletAddressLockedBalance{
  activeQiWalletAddressLockedBalance: number;
}

export interface ISetActiveQiWalletTransactions{
  activeQiWalletTransactions: Transaction[];
}