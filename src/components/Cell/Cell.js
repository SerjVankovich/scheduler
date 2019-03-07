import React from 'react'
import SubCell from "./SubCell";
import config from "../../config";




const Cell = ({address, miniCells, deleteEvent, replaceEvent, dayStart, delimiter, setSubCellHovered, lastHoveredSubCell}) => (
    <div className="cell" style={{ height: config.cellHeight }}>
        {miniCells.map((miniCell, index) => (
            <SubCell lastHoveredSubCell={lastHoveredSubCell} setSubCellHovered={setSubCellHovered} delimiter={delimiter} address={address} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} me={miniCell} num={index} key={index}/>
        ))}
    </div>
);

export default Cell