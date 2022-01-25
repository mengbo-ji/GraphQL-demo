import * as express from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import * as cors from 'cors'
import { v4 as uuidV4 } from 'uuid'

const app = express()

app.use(cors())

const articles = [
  { id: '1', title: 'article 1', content: 'content 1' },
  { id: '2', title: 'article 2', content: 'content 2' },
  { id: '3', title: 'article 3', content: 'content 3' },
]

// 1. 定义schema
const schema = buildSchema(`

  type Article {
    id: ID!
    title: String!
    content: String!
    tagList: [ String! ]
  }
  # 查询入口
  type Query {
    articles: [ Article ]
    article(id: ID!): Article
  }

  # 参数对象必须用 Input 定义
  input CreateArticleInput {
    title: String
    content: String
    tagList: [ String ]
  }

  input UpdateArticleInput {
    title: String
    content: String
  }

  type DeleteStatus {
    success: Boolean!
  }

  # 修改入口
  type Mutation {
    createArticle(article: CreateArticleInput): Article
    updateArticle(id: ID!,  article: UpdateArticleInput): Article
    deleteArticle(id: ID!): DeleteStatus
  }
`);

// 2. 定义 resolver
const root = {
  articles: () => articles,
  article: ({ id }: any) => articles.find(v => v.id === id),
  createArticle: ({ article }: any) => {
    article.id = uuidV4()
    articles.push(article)
    return article
  },
  updateArticle: ({ id, article: updateArticle }: any) => {
    const article = articles.find(v => v.id === id)
    article.title = updateArticle.title
    article.content = updateArticle.content
    return article
  },
  deleteArticle({ id }: any) {
    const index = articles.findIndex(v => v.id === id)
    articles.splice(index, 1)
    return {
      success: true
    }
  }
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true // 开启浏览器GraphQL IDE 调试工具
}))



app.listen(1234, () => console.log('Now browse to localhost:1234/graphql'))
