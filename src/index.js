import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as configurator from 'configurator/configurator';
import { connectSockets } from './services';

// defaults
configurator.register({
  production: false,
  title: 'Reckoning {React} (Dev)',
  api: {
    reckoning: 'https://reckoning-api.app.intel.com',
  },
  googleAnalyticsId: '',
  storyFilter: {
    project: '182579615780', // TNT Team Rally ID
    flowState: '193398767036'
  },
});

// local values
configurator.register({
  HOST: [/localhost/],
  production: true,
  title: 'Reckoning {React} (Local)',
  api: {
    reckoning: 'https://reckoning-api.app.intel.com',
  }
});

// test values
configurator.register({
  HOST: ['reckoning-ui-test.app.intel.com', 'reckoning-ui-test.apps1-fm-int.icloud.intel.com'],
  production: true,
  title: 'Reckoning {React} (Test)',
  api: {
    reckoning: 'https://reckoning-api-test.app.intel.com',
  }
});

// production values
configurator.register({
  HOST: ['reckoning.app.intel.com', 'reckoning-ui-prod.apps1-fm-int.icloud.intel.com'],
  production: true,
  title: 'Reckoning {React}',
  api: {
    reckoning: 'https://reckoning-api.app.intel.com',
  },
  googleAnalyticsId: ''
});

connectSockets().then((sockets) => {
  ReactDOM.render(<App io={sockets}/>, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
