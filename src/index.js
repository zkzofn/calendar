import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import promise from 'redux-promise';

import App from './containers/App';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

export const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={customHistory}>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </Router>
  </Provider>
  , document.getElementById('root')
);

serviceWorker.unregister();
