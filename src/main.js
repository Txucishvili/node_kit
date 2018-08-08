import React from 'react';
import {render} from 'react-dom';

import App from './app';

const renderApp = () => {
  render(
    <App/>,
    document.getElementById('index'),
  );
};

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./app', () => renderApp());
}

renderApp();
