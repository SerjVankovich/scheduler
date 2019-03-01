import Constants from '../actions/constants'

export default function cells(state=[], action) {
    switch (action.type) {
        case Constants.DELETE_EVENT_FROM_CELL:
            const cell = state[action.cellAddress[0]][action.cellAddress[1]];
            cell.events = cell.events.filter(event => event.id !== action.eventId);
            state[action.cellAddress[0]][action.cellAddress[1]] = cell;
            return [...state];
        case Constants.REPLACE_EVENT:
            state[action.cellAddress[0]][action.cellAddress[1]].events.push(action.event);
            return [...state];
        default: return state
    }
}