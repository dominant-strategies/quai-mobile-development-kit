import { Contact } from "src/types";

export interface IAddContact{
    contact: Contact;
  }

export interface IUpdateContact{
    contact: Contact;
  }

export interface IDeleteContact{
    contactIndex: number;
  }


