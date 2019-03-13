import React from 'react'
import SubCell from "../../connectedComponents/SubCell";
import config from "../../config";




const Cell = ({events, address, miniCells, deleteEvent, replaceEvent, dayStart, delimiter, setSubCellHovered}) => (
    <div className="cell" style={{ height: config.cellHeight }}>
        {miniCells.map((miniCell, index) => (
            <SubCell events={events} setSubCellHovered={setSubCellHovered} delimiter={delimiter} address={address} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} me={miniCell} num={index} key={index}/>
        ))}
    </div>
);

export default Cell