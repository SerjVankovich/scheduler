export const getHoveredSubCell = (cells) => {
    let hoveredSubCell = null

    cells.forEach(cols => cols.forEach(cell => cell.subCells.forEach((subCell, i) => {
        if (subCell.hovered) {
            subCell.num = i;
            hoveredSubCell = subCell
        }
    })));

    return hoveredSubCell
};