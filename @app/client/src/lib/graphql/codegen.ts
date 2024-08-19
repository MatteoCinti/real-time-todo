import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const { VITE_BACKEND_URL } = import.meta.env;

const config: CodegenConfig = {
  schema: `${VITE_BACKEND_URL}/graphql`,
  overwrite: true,

  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['./src/lib/graphql/**/*.{graphql, ts}'],
  generates: {
    './src/lib/graphql/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  }
};

export default config;
