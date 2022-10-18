/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_INTERNAL: string;
  readonly VITE_API_EXTERNAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
