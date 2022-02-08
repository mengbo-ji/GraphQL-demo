import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'
import { GraphQLSchema } from 'graphql'
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'

function upperDirective(directiveName: string) {
  return {
    upperDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
    upperDirectiveTransformer: (schema: GraphQLSchema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: fieldConfig => {
        const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
        if (upperDirective) {
          const { resolve  } = fieldConfig
          fieldConfig.resolve = async function (source, args, context, info) {
            const result = await resolve(source, args, context, info)
            if (typeof result === 'string') {
              return result.toUpperCase()
            }
            return result
          }
          return fieldConfig
        }
      }
    })
  }
}


const { upperDirectiveTypeDefs, upperDirectiveTransformer } = upperDirective('upper')

let schema = makeExecutableSchema({
  typeDefs: [
    upperDirectiveTypeDefs,
    typeDefs
  ],
  resolvers,
})

schema = upperDirectiveTransformer(schema)

export default schema