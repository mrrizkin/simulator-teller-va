/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_INTERNAL: string;
  readonly VITE_API_EXTERNAL: string;
  readonly VITE_USER_INTERNAL: string;
  readonly VITE_PASS_INTERNAL: string;
  readonly VITE_USER_EXTERNAL: string;
  readonly VITE_PASS_EXTERNAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
