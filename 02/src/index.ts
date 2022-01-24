import * as express from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import * as cors from 'cors'

const app = express()

app.use(cors())

// 1. 定义schema
const schema = buildSchema(`

  type Score {
    name: String
    score: Float
  }

  type User {
    name: String
    age: Int
    hobbies: [ String ]
    scores: [ Score ]
  }

  type Article {
    title: String
    content: String
    author: User
  }

  # Query 严格来说是一种对象类型
  # Query 是所有查询的入口点
  # Query 必须有，且不能重复
  type Query {
    foo: String
    count: Int
    salary: Float
    bol: Boolean
    id: ID
    user: User
    article: Article
  }
`);

// 2. 定义 resolver
const root = {
  foo: () => 'Hello world!',
  count: () => '123',
  salary: () => 12.2,
  bol: () => true,
  id: () => 1234,
  user: () => ({
    name: '张三',
    age: 18,
    hobbies: ['吃饭', '睡觉'],
    scores: [
      { name: '英语', score: 80 },
      { name: '数学', score: 100 }
    ]
  }),
  article: () => ({
    title: '文章',
    content: '内容',
    author: {
      user: 'Jack',
      age: 18,
      hobbies: ['吃饭', '睡觉'],
      scores: [
        { name: '英语', score: 80 },
        { name: '数学', score: 100 }
      ]
    }
  })
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true // 开启浏览器GraphQL IDE 调试工具
}))



app.listen(1234, () => console.log('Now browse to localhost:1234/graphql'))
