import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import s from './fadeModules/fadeAppTitle.module.css';
import fadeAlert from './fadeModules/fadeAppAlert.module.css';
import fadeFilter from './fadeModules/fadeFilter.module.css';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    alert: false,
    message: '',
  };

  handleAddContact = newContact =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handleCheckUnique = name => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact &&
      this.setState({ alert: true, message: 'This contact already exists' });
    setTimeout(() => this.setState({ alert: false, message: '' }), 2000);
    return !isExistContact;
  };

  handleRemoveContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = filter => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    const { filter, alert, message, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={s.page}>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={s}
          unmountOnExit
        >
          <h1 className={s.phoneBookTitle}>Phonebook</h1>
        </CSSTransition>

        <CSSTransition
          in={alert}
          timeout={250}
          classNames={fadeAlert}
          unmountOnExit
        >
          <p className={fadeAlert.alert}>{message}</p>
        </CSSTransition>

        <ContactForm
          onAdd={this.handleAddContact}
          onCheckUnique={this.handleCheckUnique}
        />

        <CSSTransition
          in={contacts.length > 1}
          appear={true}
          timeout={250}
          unmountOnExit
          classNames={fadeFilter}
        >
          <div className={s.findContacts}>
            <h2 className={s.findContactsTitle}>Find contacts</h2>
            <Filter filter={filter} onChange={this.handleFilterChange} />
          </div>
        </CSSTransition>
        {/* {contacts.length < 1 ? (
          'Contacts list is empty'
        ) : ( */}
        <ContactList
          contacts={visibleContacts}
          onRemove={this.handleRemoveContact}
        />
        {/* )} */}
      </div>
    );
  }
}

export default App;
