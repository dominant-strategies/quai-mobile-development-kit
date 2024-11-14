import { Recipient, Transaction } from 'src/quai-mdk/blockscout';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { Contact, Wallet } from 'src/types';

export const appendRecipientToTx = (
  tx: Transaction,
  wallet: Wallet,
  contacts?: Contact[],
): Transaction => {
  const isUserSender = tx.from.toLowerCase() === wallet.address.toLowerCase();
  const contact = contacts?.find(
    c =>
      c.address.toLowerCase() ===
      (isUserSender ? tx.to.toLowerCase() : tx.from.toLowerCase()),
  );
  const recipient: Recipient = contact
    ? {
        display: contact.username,
        profilePicture: contact.profilePicture,
      }
    : {
        display: isUserSender
          ? abbreviateAddress(tx.to)
          : abbreviateAddress(tx.from),
      };

  return {
    ...tx,
    recipient,
  };
};
