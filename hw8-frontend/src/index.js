import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import Reducer from './reducers'
import App from './components/app'

import { init } from './components/auth/authActions'

const store = createStore(Reducer, applyMiddleware(thunk))

store.dispatch(init())

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
