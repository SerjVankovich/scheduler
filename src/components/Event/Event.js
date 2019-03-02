import React from 'react'
import "./Event.css"
import {getEventColor, getHeightOfEvent} from "../../helpers/eventToIndexHelper";
import {DragSource} from "react-dnd";

const eventSource = {
    beginDrag(props) {
        return props
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return
        }
        const cellId = monitor.getDropResult().address;
        const subCell = monitor.getDropResult().subCell;
        console.log(props.deleteEvent);
        props.deleteEvent(props.address, props.event.id, props.subCell);
        return props.replaceEvent(cellId, props.event, props.dayStart, subCell, props.delimiter);

    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

const Event = ({ address, event, isDragging, connectDragSource }) => connectDragSource(
    <div className="event" style=
        {{
            background: getEventColor(),
            height: parseInt(getHeightOfEvent(event)) - 2,
        }}>
                <h6>
                    {event.title} <br/>
                    Start: {new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} <br/>
                    End: {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
                </h6>
    </div>

);

export default DragSource('event', eventSource, collect)(Event)