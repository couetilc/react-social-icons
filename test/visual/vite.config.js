import { defineConfig } from 'vite'
import config from '../../vite.config.js'

export default defineConfig(async () => {
  const c = await config()
  c.build.write = true
  return c
})
