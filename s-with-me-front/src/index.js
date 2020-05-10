import React, { Profiler } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from './components/student/profile/Profile.jsx'
import SignUpP from './components/signUp/SignUpP'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Profile />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
