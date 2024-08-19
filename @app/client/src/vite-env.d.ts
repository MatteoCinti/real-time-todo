/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_WS_URL: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
