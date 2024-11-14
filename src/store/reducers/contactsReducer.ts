import createReducer from '../createReducer';
import * as types from '../actions/types';
import { IContactsState } from '../models/reducers/contacts';
import { IAddContact, IDeleteContact } from '../models/actions/contacts';

export const initialContactsState: IContactsState = {
    contactsList: []
  };

  export const contactsReducer = createReducer(initialContactsState, {
    [types.ADD_NEW_CONTACT](state: IContactsState, action: IAddContact) {
        return {
          ...state,
          contactsList: [...state.contactsList, action.contact]
        };
      },
    [types.DELETE_CONTACT](state: IContactsState, action: IDeleteContact) {
        return {
          ...state,
          contactsList: [  ...state.contactsList.slice(0, action.contactIndex),
            ...state.contactsList.slice(action.contactIndex + 1)]
        };
      },

  });