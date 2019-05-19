import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/bookQueries';

class BookDetails extends Component {
  render() {
    const { getBookQuery: { book, loading } } = this.props;
    return (
      <div id="book-details">
        <h2>Book Details</h2>
        {
          loading ? (<p>Loading ...</p>)
            : (<div>
              {!book ? <div>Select A Book</div> :
                (<div>
                  <h4>Title : {book.name}</h4>
                  <p>Genre : {book.genre}</p>
                  <p>Author : {book.author.name}</p>
                  <h4>All Books By {book.author.name}</h4>
                  <ul>
                    {book.author.books.map(item => {
                      return (<li key={item.id}>{item.name}</li>)
                    })}
                  </ul>

                </div>)
              }
            </div>)
        }
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }, name: "getBookQuery"
})(BookDetails);
