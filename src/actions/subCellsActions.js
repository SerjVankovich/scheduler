import Constants from './constants'

export const setSubCellHovered = (subCell, num) => ({
    type: Constants.SUBCELL_HOVERED,
    subCell, num
});