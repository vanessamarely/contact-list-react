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
    let favoriteList = this.state.favorites;
    favoriteList.push(contact);
    this.setState({
      favorites: favoriteList
    });
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
      { props.contacts.map( contact => <ContactCard key={contact.name.first} contact={contact} addFavorites={props.addFavorites} /> ) }
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
          <figcaption>{ this.props.contact.name.first }</figcaption>
        </figure>
        <button onClick={this.onClickFavorites}>Favorito</button>
        <button>Eliminar</button>
      </div>
    );
  }
}

export default App;
