import data from "../data";
import {getMarginOfEvent, isInThisWeek} from "./eventToIndexHelper";

export const makeEmptyTable = (dayStart, dayEnd) => {
    const cols = [];
    for (let i = 0; i < dayEnd - dayStart + 1; i++) {
        let cells = [];
        for (let j = 0; j < 7; j++) {
            const cell = {
                address: [i, j],
                events: []
            };
            cells.push(cell)
        }
        cols.push(cells)
    }
    return cols
};

export const makeDays = (dayStart, dayEnd) => {
    const days = [];
    for (let i = dayStart; i <= dayEnd; i++) {
        days.push(i)
    }
    return days
}

export const makeTable = (week, dayStart, cols) => {
    data.events.forEach(event => {
        getMarginOfEvent(event);
        const date = new Date(event.start);
        if (isInThisWeek(date, week)) {
            const hours = date.getHours() - dayStart
            let day = date.getDay();
            if (day === 0) {
                day = 7
            } else {
                day -= 1
            }
            try {
                cols[hours][day].events.push(event)
            } catch (e) {
            }

        }
    });

    return cols
};