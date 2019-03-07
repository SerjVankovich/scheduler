import Constants from '../actions/constants'

export default function cells(state=[], action) {
    switch (action.type) {
        case Constants.DELETE_EVENT_FROM_CELL:
            console.log(action.subCell)
            const subCell = state[action.cellAddress[0]][action.cellAddress[1]].subCells[action.subCell];
            subCell.events = subCell.events.filter(event => event.id !== action.eventId);
            state[action.cellAddress[0]][action.cellAddress[1]].subCells[action.subCell] = subCell;
            return [...state];
        case Constants.REPLACE_EVENT:
            state[action.cellAddress[0]][action.cellAddress[1]].subCells[action.subCell].events.push(action.event);
            return [...state];
        case Constants.SUBCELL_HOVERED:
            if (action.lastHoveredSubCell !== null) {
                state[action.lastHoveredSubCell.address[0]][action.lastHoveredSubCell.address[1]].subCells[action.lastHoveredSubCell.num].hovered = false
            }
            state[action.subCell.address[0]][action.subCell.address[1]].subCells[action.num].hovered = true;
            return [...state];
        default: return state
    }
}