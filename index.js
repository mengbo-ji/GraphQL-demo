const { graphql, buildSchema } = require('graphql');
 
const schema = buildSchema(`
  type Query {
    foo: String
    count: Int
  }
`);
 
const root = { 
  foo: () => 'Hello world!',
  count: () => 123,
 };
 
graphql(schema, '{ count }', root).then((response) => {
  console.log(response);
});