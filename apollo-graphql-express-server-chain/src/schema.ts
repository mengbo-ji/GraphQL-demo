import { gql } from 'apollo-server-express'
// 1. 定义 apollo schema
const typeDefs = gql`

  # An author has a name
  type Author {
    name: String!
  }

  # A book has a title and author
  type Book {
    title: String!
    author: Author!
  }

  # A library has a branch and books
  type Library {
    branch: String!
    books: [Book!]
  }

  type Query {
    libraries: [Library]
  }
`;

const libraries = [
  {
    branch: 'downtown'
  },
  {
    branch: 'riverside'
  },
];

// The branch field of a book indicates which library has it in stock
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    branch: 'riverside'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown'
  },
];


// 2. 定义resolvers
const resolvers = {
  Query: {
    libraries(parent: any, args: any, context: any) {
      console.log(context)
      // Return our hardcoded array of libraries
      return libraries;
    }
  },
  Library: {
    books(parent: any) {

      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter(book => book.branch === parent.branch);
    }
  },
  Book: {

    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    author(parent: any) {
      return {
        name: parent.author
      };
    }
  }

  // Because Book.author returns an object with a "name" field,
  // Apollo Server's default resolver for Author.name will work.
  // We don't need to define one.
};

export {
  typeDefs,
  resolvers
}