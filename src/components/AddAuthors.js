import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addAuthorMutation, getAuthorsQuery } from '../queries/authorQueries';


class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: ''
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addAuthorMutation } = this.props;
    const { name, age } = this.state;

    console.log('------here------', age)
    addAuthorMutation({
      variables: {
        name, age: parseInt(age)
      },
      refetchQueries: [{ query: getAuthorsQuery }]
    });
    this.setState({
      name: '',
      age: ''
    });

  }


  render() {
    const { name, age } = this.state;
    return (
      <div className="">
        <div className="book-form">
          <h3>Add Author</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Author Name" value={name}
              onChange={this.handleChange} required />

            <label htmlFor="age">Age</label>
            <input type="text" name="age" placeholder="Age" pattern="^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$"
              title="Age should be a number btn 0-200" value={age} onChange={this.handleChange} required />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(addAuthorMutation, { name: "addAuthorMutation" }),
)(AddBook);
