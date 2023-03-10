import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import sentryVitePlugin from '@sentry/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))
  return {
    root: 'src',
    publicDir: '../public',
    envDir: '../',
    base: process.env.BASE_PATH || '/',
    server: {
      open: process.env.BASE_PATH || '/',
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: 'hidden',
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    plugins: [
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: process.env.VITE_SENTRY_ORG,
        project: process.env.VITE_SENTRY_PROJECT,
        // Specify the directory containing build artifacts
        include: './dist',
        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
        // Optionally uncomment the line below to override automatic release name detection
        // release: process.env.RELEASE,
      }),
    ],
  }
})
