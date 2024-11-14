import { useEffect, useState } from 'react';
import { retrieveStoredKey } from 'src/quai-mdk/keyStore';

export const useRetrieve = (key: string) => {
  const [retrieved, setRetrieved] = useState<any>();
  useEffect(() => {
    (async () => {
      const retrievedItem = await retrieveStoredKey(key);
      if (!retrievedItem) {
        throw new Error(`No ${key} found`);
      }
      setRetrieved(retrievedItem);
    })();
  }, [key]);
  return retrieved;
};
