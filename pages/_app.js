import 'tailwindcss/tailwind.css'
import '../styles/fonts/FuturaPT.css'
import '../styles/global.css'
import Head from 'next/head'

import { createStore, applyMiddleware, compose } from 'redux'
import { batchedSubscribe } from 'redux-batched-subscribe'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import allReducers from 'state/reducers'

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // window &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__()
  // batchedSubscribe((notify) => {
  //   notify()
  // })
)

const store = createStore(
  allReducers,
  enhancer /* preloadedState, */
  // applyMiddleware(thunk),
  // typeof window !== 'undefined' &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__()
  // ,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
