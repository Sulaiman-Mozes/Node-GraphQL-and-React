import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/bookQueries';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    }
  }
  displayBooks = () => {
    const { books, loading } = this.props.data;
    if (loading) {
      return (<div>Loading Books ...</div>)
    } else {
      return books.map(book => {
        return (
          <li key={book.id} onClick={() => {
            this.setState({ selected: book.id });
          }}>
            {book.name}
          </li>
        )
      })
    }
  }
  render() {
    const { selected } = this.state;
    return (
      <div>
        <h1>Books Collection</h1>
        <div id="book-layout">
          <div id="book-list">
            <ul>
              {this.displayBooks()}
            </ul>
          </div>
          <BookDetails bookId={selected} />
        </div>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
