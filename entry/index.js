import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import Counter from '../src/components/Counter'
import counter from '../src/reducers'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = createStore(counter, preloadedState)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
    <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({type: 'INCREMENT'})}
        onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    rootEl
)

render()
store.subscribe(render)
