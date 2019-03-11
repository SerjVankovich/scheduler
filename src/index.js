import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './connectedComponents/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import storeFactory from "./store/store";
import {makeWeek} from "./helpers/weekHelper";
import { makeEmptyTable, makeTable} from "./helpers/table";
import config from './config'
import data from './data'
import {Provider} from "react-redux";

const weekStart = new Date(2018, 3, 30);

const week = makeWeek(weekStart);
const emptyCells = makeEmptyTable(config.dayStart, config.dayEnd, 60 / config.delimiter);
const fullCells = makeTable(week, config.dayStart, emptyCells, config.delimiter);
const store = storeFactory({
    data,
    cells: fullCells,
    dayStart: config.dayStart,
    dayEnd: config.dayEnd,
    weekStart,
    delimiter: config.delimiter,
    lastHoveredSubCell: null
});

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
