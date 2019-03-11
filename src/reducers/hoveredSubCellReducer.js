import Constants from "../actions/constants"

export default function lastHoveredSubCell(state={}, action) {
    switch (action.type) {
        case Constants.SUBCELL_HOVERED:
            action.subCell.num = action.num;
            return action.subCell;
        default: return state
    }
}