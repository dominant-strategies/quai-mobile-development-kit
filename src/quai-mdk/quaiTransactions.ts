
export const getTXDirection = (myAddress: string, from:string, to:string) => {
    const myAddrr = myAddress.toLowerCase();
    const fromLC = from.toLowerCase();
    const toLC = to.toLowerCase();
    if(fromLC === toLC)
      {
        return 'transfer';
      }
    if(myAddrr === fromLC)
      {
        console.log(fromLC, myAddrr);
        return 'sent';
      }
    if(myAddrr === toLC)
      {
        return 'received';
      }
      return 'error';
  }
