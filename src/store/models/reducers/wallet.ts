
import { QiTransaction, SerializedQiHDWallet } from "quais";
import { NeuteredAddressInfo } from "quais/lib/commonjs/wallet/hdwallet";
import { SerializedQuaiHDWallet } from "quais/lib/commonjs/wallet/quai-hdwallet";
import { Transaction } from "src/quai-mdk/blockscout";

export interface IPrimaryWalletState {
    primaryWalletObject: SerializedQuaiHDWallet | undefined;
    primaryWalletPublicAddress: string | undefined;
    primaryWalletRegion: string | undefined;
    primaryWalletZone: string | undefined;
    primaryWalletPkeyName: string | undefined;
    primaryWalletPhrase: string | undefined;
  }

  export interface IPrimaryQiWalletState {
    primaryQiWalletObject: SerializedQiHDWallet | undefined;
    primaryQiWalletAddress: string | undefined;
    primaryQiWalletPhrase: string | undefined;
    primaryQiWalletScanned: boolean;
    primaryQiWalletSynced: boolean;
    primaryQiWalletLastSynced: string | undefined;
  }

export interface IActiveWalletAddressState{
  activeWalletAddress: string | undefined;
  activeWalletAddressZone: string | undefined;
  activeWalletAddressBalance: string;
  activeWalletTransactions: Transaction[];
};

export interface IActiveQiWalletAddressState{
  activeQiWalletAddress: string | undefined;
  activeQiWalletNextAddress: string | undefined;
  activeQiWalletAddresses: NeuteredAddressInfo[] | undefined;
  activeQiWalletGapAddresses: NeuteredAddressInfo[] | undefined;
  activeQiWalletChangeAddresses: NeuteredAddressInfo[] | undefined;
  activeQiWalletAddressZone: string | undefined;
  activeQiWalletPaymentCode: string | undefined;
  activeQiWalletAddressBalance: number;
  activeQiWalletAddressSpendableBalance: number;
  activeQiWalletAddressLockedBalance: number;
  activeQiWalletTransactions: QiTransaction[];
};


