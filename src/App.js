import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
 
class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      all: [],
      favorites: []
    };

    this.addFavorites = this.addFavorites.bind(this);
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=10')
      .then(item => item.json())
      .then(data => {
        this.setState({
          all: data.results
        });
      });
  }

  addFavorites(contact) {
    let favoriList = this.state.favorites;
    favoriList.push(contact);
    let filteredArray = this.state.all.filter(item => item !== contact)
    this.setState({ all: filteredArray, favorites: favoriList});
  }

  render() {
    return (
      <div className="app">
        <ContactList title="Todos" contacts={this.state.all} key="1" addFavorites={this.addFavorites} />
        <ContactList title="Favoritos" contacts={this.state.favorites } key="2" addFavorites={this.addFavorites} />
      </div>
    );
  }
}

const ContactList = (props) => {
  return (
    <div className="contact-list">
      <h2> { props.title }</h2>
      { props.contacts.map( (contact, index) => <ContactCard key={index} contact={contact} addFavorites={props.addFavorites} /> ) }
    </div>
  );
};


class ContactCard extends React.Component {
  constructor(props){
    super(props);

    this.onClickFavorites = this.onClickFavorites.bind(this);
  }

  onClickFavorites() {
    this.props.addFavorites(this.props.contact);
  }

  render(){
    return (
      <div className="contact-card">
        <figure >
          <img src={ this.props.contact.picture.medium } />
          <figcaption>{ this.props.contact.name.first } { this.props.contact.name.last }</figcaption>
        </figure>
        <button onClick={this.onClickFavorites}>Favorito</button>
        <button>Eliminar</button>
      </div>
    );
  }
}

export default App;
