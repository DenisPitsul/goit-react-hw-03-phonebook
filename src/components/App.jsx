import { Component } from "react"
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import classes from './App.module.css'

export class App extends Component {

  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const contactsFromStorage = localStorage.getItem('contacts') 
      ? JSON.parse(localStorage.getItem('contacts')) : [];
    this.setState({
      contacts: contactsFromStorage
    })
  }

  onAdd = (newContact) => {
    const isContactExist = this.state.contacts
      .some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());
    
    if (isContactExist) {
      alert(newContact.name + ' is already in contacts.')
      return;
    }
  
    const contactToCreate = {
      id: nanoid(),
      ...newContact
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactToCreate]
    }))
  }

  onFilterChange = (nameValue) => {
    this.setState({
      filter: nameValue
    })
  }

  filteredContacts = () => {
    return this.state.contacts
      .filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  }

  onRemove = (contactToRemove) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactToRemove.id)
    }))
  }

  render() {
    
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#010101'
        }}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>Phonebook</h1>
          <ContactForm onAdd={this.onAdd}/>
          {
            this.state.contacts.length > 0 && (
              <div>
                <h2 className={classes.contactsTitle}>Contacts</h2>
                <Filter filter={this.state.filter} onFilterChange={this.onFilterChange}/>
                <ContactList contacts={this.filteredContacts()} onRemove={this.onRemove}/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
};
