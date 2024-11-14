import { fetchBTCRate } from "./coingecko";
import { QuaiRateT } from "./types";

export const getQuaiRate = async () => {
    try {
      // Mock using 1/BTC rate
      // TODO: replace with actual value
      const btcRate = await fetchBTCRate();
      const mockedRateValue = 1 / (btcRate ?? 1e-13);
      const quaiRate: QuaiRateT = {
          base: mockedRateValue,
          quote: parseFloat((1 / mockedRateValue).toFixed(6)),
        }
      return quaiRate;
    } catch {
      return false;
    }
  };