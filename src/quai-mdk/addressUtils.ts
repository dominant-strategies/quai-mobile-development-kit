
export const abbreviateAddress = (address?: string) => {
    return address ? `${address.slice(0, 8)}...${address.slice(-8)}` : '';
  };

export const shortAddress = (address?: string) => {
    return address ? `...${address.slice(-10)}` : '';
  };