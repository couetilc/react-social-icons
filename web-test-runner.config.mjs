import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: true,
  files: [
    'test/social-icon.spec.jsx'
  ],
  plugins: [
    esbuildPlugin({
      jsx: true,
    }),
  ],
  open: true,
  manual: true,
}
