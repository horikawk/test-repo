import { useState } from 'react'
import * as Sentry from '@sentry/react'

import './App.css'

const BadComponent = () => {
  throw new Error('throw error test')
}

const App = () => {
  const [errorIsShown, setErrorIsShown] = useState(false)
  return (
    <div className="App">
      <h1>Sentry Sample</h1>
      <div className="card">
        {/* ボタン押下で例外を発生させる */}
        <button
          type="button"
          onClick={() => {
            setErrorIsShown(true)
          }}
        >
          Sentry.ErrorBoundaryで例外を補足
        </button>
        <button
          type="button"
          onClick={() => {
            Sentry.captureException('info level Exception test', { level: 'info' })
          }}
        >
          Infoレベルのエラー
        </button>
        <button
          type="button"
          onClick={() => {
            Sentry.captureException('error level Exception test', { level: 'error' })
          }}
        >
          Errorレベルのエラー
        </button>
        {errorIsShown && <BadComponent />}
      </div>
    </div>
  )
}

export default App
