import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as configurator from 'configurator/configurator';
import { connectSockets } from './services';

// defaults
configurator.register({
  production: false,
  title: 'Reckoning {React} (Dev)',
});

// local values
configurator.register({
  HOST: [/localhost/],
  production: true,
  title: 'Reckoning {React} (Local)',
});

// test values
configurator.register({
  HOST: ['reckoning-ui-react-test.app.intel.com', 'reckoning-ui-react-test.apps1-fm-int.icloud.intel.com'],
  production: true,
  title: 'Reckoning {React} (Test)',
});

// production values
configurator.register({
  HOST: ['reckoning-ui-react.app.intel.com', 'reckoning-ui-react.apps1-fm-int.icloud.intel.com'],
  production: true,
  title: 'Reckoning {React}',
});

connectSockets().then(({user, io }) => {
  ReactDOM.render(<App io={io} user={user}/>, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
