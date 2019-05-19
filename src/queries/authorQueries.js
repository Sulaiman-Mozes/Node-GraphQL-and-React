import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
  {
    authors{
      name,
      id,
    }
  }
`

export const addAuthorMutation = gql`
mutation($name: String!, $age: Int!){
    addAuthor(name: $name, age: $age){
        name,
        age
    }
}
`