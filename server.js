import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './src/reducers'
import Counter from './src/components/Counter'
import { renderToString } from 'react-dom/server'
import qs from 'qs'

const app = Express()
const port = 3000

//Serve static files
app.use('/static', Express.static(path.join(__dirname, 'public')));

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  const params = qs.parse(req.query);
  const counter = parseInt(params.counter, 10) || 0;

  let preloadedState = counter;

  const store = createStore(counterApp, preloadedState);

  const html = renderToString(
    <Provider store={store}>
      <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
      />
    </Provider>
  );

  const finalState = store.getState();

  res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/dist/bundle/main.bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port)
