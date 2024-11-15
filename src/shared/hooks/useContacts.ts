import { keychainKeys } from 'src/constants/keychainKeys';
import { Contact } from 'src/types/Contact';
import { retrieveStoredKey, storeKey } from 'src/quai-mdk/keyStore';
import { useEffect, useState } from 'react';

export const useContacts = (): Contact[] | undefined => {
  const [retrieved, setRetrieved] = useState<any>();
  useEffect(() => {
    (async () => {
      const retrievedItem = await retrieveStoredKey(keychainKeys.contacts);
      setRetrieved(parseIfParsable(retrievedItem));
    })();
  }, [keychainKeys.contacts]);
  return retrieved;
};

export const addContact = async (contact: Contact) => {
  const contacts = (await retrieveStoredKey(keychainKeys.contacts)) || '[]';
  const parsedContacts = JSON.parse(contacts);
  const updatedContacts = [...parsedContacts, contact];
  const stringifiedContacts = JSON.stringify(updatedContacts);
  await storeKey({ key: keychainKeys.contacts, value: stringifiedContacts });
};

const parseIfParsable = (value: string | false) => {
  try {
    return JSON.parse(value as any);
  } catch (_) {
    return value;
  }
};
