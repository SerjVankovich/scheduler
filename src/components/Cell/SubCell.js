import React from 'react'
import Event from "../Event/Event";
import {DropTarget} from "react-dnd";

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
};

const specCell = {
    drop(props, monitor, component) {
        return {address: props.address, subCell: props.num}
    },
};

const isChangeCell = (address, cellNum, lastHoveredSubCell) => {
    return address[0] !== lastHoveredSubCell.address[0] || address[1] !== lastHoveredSubCell.address[1] || cellNum !== lastHoveredSubCell.num
}

const SubCell = ({address, delimiter, num, me, dayStart, deleteEvent, replaceEvent, connectDropTarget, hovered, setSubCellHovered, lastHoveredSubCell}) => {
    if (hovered) {
        if (lastHoveredSubCell !== null) {
            console.log(isChangeCell(address, num, lastHoveredSubCell));
            if (isChangeCell(address, num, lastHoveredSubCell)) {
                setSubCellHovered(me, num, lastHoveredSubCell)
            }
        } else {
            setSubCellHovered(me, num, lastHoveredSubCell)
        }
    }
    return connectDropTarget(
        <div className="subCell" style={{ height: 100 / (60 / delimiter) + "%", background: hovered ? "grey" : "white" }}>
            {me.events.map((event, i) => (
                <Event delimiter={delimiter} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} address={address} event={event} subCell={num} key={i} />
            ))}
        </div>
    );
}

export default DropTarget('event', specCell, collect)(SubCell)