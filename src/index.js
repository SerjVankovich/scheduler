import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './connectedComponents/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import storeFactory from "./store/store";
import {makeWeek} from "./helpers/weekHelper";
import {makeDays, makeEmptyTable, makeTable} from "./helpers/table";
import config from './config'
import data from './data'
import {Provider} from "react-redux";

const weekStart = new Date(2018, 3, 30);

const week = makeWeek(weekStart);
const days = makeDays(config.dayStart, config.dayEnd);
const emptyCells = makeEmptyTable(config.dayStart, config.dayEnd);
const fullCells = makeTable(week, config.dayStart, emptyCells);
const store = storeFactory({
    data,
    cells: fullCells,
    dayStart: config.dayStart,
    dayEnd: config.dayEnd,
    weekStart
});

console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
