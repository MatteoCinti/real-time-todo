import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/lib/graphql/type-defs.ts',
  generates: {
    'src/lib/graphql/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../../../types#ApolloContext'
      }
    },
    'src/lib/graphql/__generated__/graphql.schema.json': {
      plugins: ['introspection']
    }
  }
};

export default config;
