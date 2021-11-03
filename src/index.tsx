import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import TopLevel from './components/Globals';

ReactDOM.render(
  
  <TopLevel>  
    <App />
  </TopLevel>,
  document.getElementById('root')
);