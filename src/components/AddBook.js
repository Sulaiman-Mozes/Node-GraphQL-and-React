import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery } from '../queries/authorQueries';
import { addBookMutation, getBooksQuery } from '../queries/bookQueries';

class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addBookMutation } = this.props;
    const { name, genre, authorId } = this.state;
    addBookMutation({
      variables: {
        name, genre, authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({
      name: '',
      genre: '',
      authorId: ''
    });

  }

  displayAuthors = () => {
    const { getAuthorsQuery: { authors, loading } } = this.props;
    if (loading) {
      return (<option disabled>Loading Authors</option>)
    } else {
      return authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
  }

  render() {
    const { name, genre, authorId } = this.state;
    return (
      <div className="">
        <div className="book-form">
          <h3>Add Book</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Title</label>
            <input type="text" name="name" placeholder="Book Title" value={name}
              onChange={this.handleChange} required />

            <label htmlFor="genre">Genre</label>
            <input type="text" name="genre" placeholder="Genre" value={genre}
              onChange={this.handleChange} required />

            <label htmlFor="author">Author</label>
            <select name="authorId" onChange={this.handleChange} value={authorId} required>
              <option value="">Select Author</option>
              {this.displayAuthors()}
            </select>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);
