import Constants from "./constants"

export const deleteEvent = (cellAddress, eventId, subCell) => ({
    type: Constants.DELETE_EVENT_FROM_CELL,
    cellAddress, eventId, subCell
});

export const replaceEvent = (cellAddress, event, dayStart, subCell, delimiter) => ({
    type: Constants.REPLACE_EVENT,
    cellAddress, event, dayStart, subCell, delimiter
});