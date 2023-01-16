import { useState } from 'react'
import * as Sentry from '@sentry/react'

import './App.css'

import { axios } from './lib/axios'

const BadComponent = () => {
  throw new Error('BadComponent error')
}

const ApiCall402 = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    void (await axios.get('/user'))
  } catch (e) {
    Sentry.captureMessage('ApiCall402 error', { level: 'warning' })
  }
}

const ApiCall500 = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    void (await axios.get('/login'))
  } catch (e) {
    Sentry.captureException('ApiCall500 error', { level: 'error' })
  }
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
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button type="button" onClick={() => ApiCall402()}>
          API実行(402エラー)
        </button>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button type="button" onClick={() => ApiCall500()}>
          API実行(500エラー)
        </button>
        {errorIsShown && <BadComponent />}
      </div>
    </div>
  )
}

export default App
