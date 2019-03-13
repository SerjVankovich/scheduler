import Constants from './constants'

export const setSubCellHovered = (subCell, num) => ({
    type: Constants.SUBCELL_HOVERED,
    subCell, num
});

export const setSubCellDirection = (subCell, direction) => ({
    type: Constants.SET_SUBCELL_DIRECTION,
    subCell, direction
})