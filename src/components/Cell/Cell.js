import React from 'react'
import Event from "../Event/Event";
import {DropTarget} from "react-dnd";

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
});

const specCell = {
    drop(props, monitor, component) {
        return {address: props.address}
    }
};

const Cell = ({address, events, deleteEvent, replaceEvent, dayStart, connectDropTarget, hovered}) => connectDropTarget(
    <div className="cell" style={{ background: hovered ? "#cbc8cb" : "white"}}>
        {events.map((event, index) => (
            <Event address={address} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} event={event} key={index}/>
        ))}
    </div>
);

export default DropTarget('event', specCell, collect)(Cell)