import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/providers/graphql/type-defs.ts',
  generates: {
    'src/providers/graphql/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    },
    'src/providers/graphql/__generated__/graphql.schema.json': {
      plugins: ['introspection']
    }
  }
};

export default config;
