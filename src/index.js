import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const weekStart = new Date(2018, 3, 30);
console.log(weekStart.getDay());

ReactDOM.render(<App weekStart={weekStart} dayStart={7} dayEnd={18} />, document.getElementById('root'));
