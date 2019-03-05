import data from "../data";
import {getEventColor, isInThisWeek} from "./eventToIndexHelper";

const getSubCells = (numSubCells, address) => {
    const subCells = [];
    for (let i = 0; i < numSubCells; i++) {
        subCells.push({
            address,
            events: []
        })
    }

    return subCells
}

export const makeEmptyTable = (dayStart, dayEnd, numSubCells) => {
    const cols = [];
    for (let i = 0; i < dayEnd - dayStart + 1; i++) {
        let cells = [];
        for (let j = 0; j < 7; j++) {
            const cell = {
                address: [i, j],
                subCells: getSubCells(numSubCells, [i, j]),
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

export const makeTable = (week, dayStart, cols, delimiter) => {
    data.events.forEach(event => {
        event.color = getEventColor();
        const date = new Date(event.start);
        if (isInThisWeek(date, week)) {
            const hours = date.getHours() - dayStart;
            const minutes = date.getMinutes();
            const subCellIndex = parseInt(minutes / delimiter);
            let day = date.getDay();
            if (day === 0) {
                day = 6
            } else {
                day -= 1
            }
            try {
                cols[hours][day].subCells[subCellIndex].events.push(event)
            } catch (e) {
            }

        }
    });

    return cols
};