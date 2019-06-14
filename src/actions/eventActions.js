import Constants from "./constants"

export const deleteEvent = (cellAddress, num, subCell) => ({
    type: Constants.DELETE_EVENT_FROM_CELL,
    cellAddress, num, subCell
});

export const replaceEvent = (cellAddress, event, dayStart, subCell, delimiter) => ({
    type: Constants.REPLACE_EVENT,
    cellAddress, event, dayStart, subCell, delimiter
});

export const replaceCollisions = (event, collisions, events) => ({
    type: Constants.REMOVE_COLLISIONS,
    event, collisions, events
});

export const clearCollisions = event => ({
    type: Constants.CLEAR_COLLISIONS,
    event
});

export const resizeEvent = (eventId, incrementedMinutes) => ({
    type: Constants.RESIZE_EVENT,
    eventId, incrementedMinutes
});

export const rerenderCollisions = (events) => ({
    type: Constants.RERENDER_COLLISIONS,
    events
});