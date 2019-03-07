import Constants from './constants'

export const setSubCellHovered = (subCell, num, lastHoveredSubCell) => ({
    type: Constants.SUBCELL_HOVERED,
    subCell, num, lastHoveredSubCell
});