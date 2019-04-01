import React from 'react'
import "./Event.css"
import {getHeightOfEvent} from "../../helpers/eventsHelper";
import {DragSource} from "react-dnd";
import {isCollision} from "./EventPreview";

const eventSource = {
    beginDrag(props) {
        return {...props, startDragging: true}
    },
    /*isDragging(props, monitor) {
        const cellId = monitor.getItem().address;
        const subCell = monitor.getItem().subCell;

        return throttle(() => props.replaceEvent(cellId, props.event, props.dayStart, subCell, props.delimiter), 1000)
    }, */

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return
        }

        const collisions = isCollision(props.lastHoveredSubCell, props.event, props.events, monitor.getItem());
        console.log(props.subCell)

        if (collisions.length !== 0) {
            props.replaceCollisions(props.event, collisions)
        } else {
            props.clearCollisions(props.event)
        }

        const cellId = monitor.getDropResult().address;
        const subCell = monitor.getDropResult().subCell;
        props.deleteEvent(props.address, props.event.id, props.subCellNum);
        return props.replaceEvent(cellId, props.event, props.dayStart, subCell, props.delimiter);

    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    item: monitor.getItem()
});

class Event extends React.Component {
    componentDidMount() {
        this.props.connectDragPreview(new Image())
    }

    render() {
        const { event, isDragging, connectDragSource, startDrag, collisions } = this.props;

        const myCollisions = collisions[event.id];
        const order = myCollisions.order;


        return connectDragSource(
            <div className="event" style=
                {{
                    gridColumnStart: order,
                    gridColumnEnd: order + 1,
                    background: event.color,
                    height: parseInt(getHeightOfEvent(event)) - 2,
                    display: isDragging ? "none" : "inline",
                    opacity: startDrag ? 0.5 : 1,
                    width: "100%"
                }}>
                    <p style={{ fontSize: 5 }}>
                        {event.title} <br/>
                        Start: {new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} <br/>
                        End: {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
                    </p>

            </div>

        );
    }
}

export default DragSource('event', eventSource, collect)(Event)