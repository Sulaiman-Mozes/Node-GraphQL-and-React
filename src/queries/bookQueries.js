import { gql } from 'apollo-boost';

export const getBooksQuery = gql`
{
  books{
    name,
    genre,
    id,
    author{
        name
    }
  }
}
`
export const addBookMutation = gql`
mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId ){
        name,
        genre,
        id
    }
}
`
export const getBookQuery = gql`
query($id: ID){
    book(id: $id ){
        name,
        genre,
        id,
        author{
            name,
            id,
            books{
                name,
                genre,
                id
            }
        }
    }
}
`
