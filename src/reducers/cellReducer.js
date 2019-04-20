import Constants from '../actions/constants'

export default function cells(state=[], action) {
    switch (action.type) {
        case Constants.DELETE_EVENT_FROM_CELL:
            state[action.cellAddress[0]][action.cellAddress[1]].subCells[action.subCell].events.splice(action.num, 1);
            state[action.cellAddress[0]][action.cellAddress[1]] = {...state[action.cellAddress[0]][action.cellAddress[1]]}
            return [...state];
        case Constants.REPLACE_EVENT:
            state[action.cellAddress[0]][action.cellAddress[1]].subCells[action.subCell].events.push(action.event);
            return [...state];
        case Constants.SET_SUBCELL_DIRECTION:
            state[action.subCell.address[0]][action.subCell.address[1]].subCells[action.subCell.num].direction = action.direction;
            return [...state];
        default: return state
    }
}