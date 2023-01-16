import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'

import { worker } from './__mocks__/api/browser'
import App from './App'

import './index.css'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN, // Sentry上のClient Keys(DSN)
  // ログ送信前処理
  beforeSend(event) {
    // infoレベルは送信しない
    if (event.level === 'info') {
      return null
    }
    return event
  },
})

void worker.start()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Exception thrown!!!</p>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
)
