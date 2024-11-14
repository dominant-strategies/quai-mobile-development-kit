import { EventFragment, FunctionFragment, Interface, InterfaceAbi } from "quais"

export const MAILBOX_EVENTS = {
  NotificationSent: EventFragment.from(
    "NotificationSent(string senderPaymentCode, string receiverPaymentCode)"
  ),
}

const MAILBOX_FUNCTIONS = {
  notify: FunctionFragment.from(
    "notify(string senderPaymentCode, string receiverPaymentCode)"
  ),
  getNotifications: FunctionFragment.from(
    "getNotifications(string receiverPaymentCode) view returns (string[])"
  ),
}

//call get notifications for recipients payment code to check for notification to see if it needs to be sent.

export const MAILBOX_ABI: InterfaceAbi = [
  ...Object.values(MAILBOX_FUNCTIONS),
  ...Object.values(MAILBOX_EVENTS),
]
export const MAILBOX_INTERFACE: Interface = new Interface(MAILBOX_ABI)
