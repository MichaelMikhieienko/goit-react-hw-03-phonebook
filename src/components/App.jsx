import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: ''
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    const { contacts } = this.state;
    const existingContact = contacts.find((c) => c.name === contact.name);
    if (existingContact) {
      alert('This contact already exists in the phonebook.');
      return;
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact]
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id)
    }));
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
