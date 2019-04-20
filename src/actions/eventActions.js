import Constants from "./constants"

export const deleteEvent = (cellAddress, num, subCell) => ({
    type: Constants.DELETE_EVENT_FROM_CELL,
    cellAddress, num, subCell
});

export const replaceEvent = (cellAddress, event, dayStart, subCell, delimiter) => ({
    type: Constants.REPLACE_EVENT,
    cellAddress, event, dayStart, subCell, delimiter
});

export const setStartNum = (eventId, num) => ({
    type: Constants.SET_START_NUM,
    eventId, num
});

export const setEndNum = (eventId, num) => ({
    type: Constants.SET_END_NUM,
    eventId, num
});

export const replaceCollisions = (event, collisions) => ({
    type: Constants.REMOVE_COLLISIONS,
    event, collisions
});

export const clearCollisions = event => ({
    type: Constants.CLEAR_COLLISIONS,
    event
});