import { Contact } from 'src/types';
import * as types from './types';

export function addContact(contact: Contact) {
    return {
      type: types.ADD_NEW_CONTACT,
      contact,
    };
  }

  export function deleteContact(contactIndex: number) {
    return {
      type: types.DELETE_CONTACT,
      contactIndex,
    };
  }