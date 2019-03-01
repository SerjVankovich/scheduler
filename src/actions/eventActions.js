import Constants from "./constants"

export const deleteEvent = (cellAddress, eventId) => ({
    type: Constants.DELETE_EVENT_FROM_CELL,
    cellAddress, eventId
});

export const replaceEvent = (cellAddress, event, dayStart) => ({
    type: Constants.REPLACE_EVENT,
    cellAddress, event, dayStart
});