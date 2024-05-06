import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.scss';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { getDataFromLs } from './utils/helper';

export const App = () => {
  const [contacts, setContacts] = useState(getDataFromLs());
  const [filter, setFilter] = useState('');

  const createNewContact = (name, number) => {
    const isExist = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prev => [{ id: nanoid(), name, number }, ...prev]);
    console.log('Created successfully');
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    console.log('Deleted successfully');
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} createNewContact={createNewContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChangeFilter} />
      <ContactList
        contacts={filteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};
