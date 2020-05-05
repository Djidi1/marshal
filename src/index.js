// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/framework7.esm.bundle';
import Framework7React from 'framework7-react';

// Import main App component
import App from './components/App.jsx';

// Framework7 styles
import './css/app.scss';
import 'framework7/css/framework7.bundle.css';
import './css/icons.css';

// Init Framework7-React plugin
Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(
  React.createElement(App),
  document.getElementById('app'),
);

