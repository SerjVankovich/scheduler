import React from 'react'
import Event from "../Event/Event";
import EventPreview from '../Event/EventPreview';
import {DropTarget} from "react-dnd";

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
});

const specCell = {
    drop(props, monitor, component) {
        return {address: props.address, subCell: props.num}
    }

}

const SubCell = ({address, delimiter, num, me, dayStart, deleteEvent, replaceEvent, connectDropTarget, hovered}) => {
    if (hovered) 
        return connectDropTarget(
            <div className="subCell" style={{ height: 100 / (60 / delimiter) + "%", background: "white" }}>
                <EventPreview />
            </div>
        );
    else 
        return connectDropTarget(
        <div className="subCell" style={{ height: 100 / (60 / delimiter) + "%", background: "white" }}>
            {me.events.map((event, i) => (
                <Event delimiter={delimiter} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} address={address} event={event} subCell={num} key={i} />
            ))}
        </div>
    );
}

export default DropTarget('event', specCell, collect)(SubCell)