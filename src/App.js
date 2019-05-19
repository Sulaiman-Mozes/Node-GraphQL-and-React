import React, { Component } from 'react';
import './index.css'
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthors';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  uri: 'http://localhost:5000/grahpql'
})

class App extends Component {
  render() {

    return (
      <ApolloProvider client={client}>
        <div id="main">
          <BookList /><br />
          <div id="form-layout">
            <AddBook />
            <AddAuthor />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
