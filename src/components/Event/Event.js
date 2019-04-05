import React from 'react'
import "./Event.css"
import {getHeightOfEvent} from "../../helpers/eventsHelper";
import {DragSource} from "react-dnd";
import {isCollision} from "./EventPreview";
import Resizable from "re-resizable";

const eventSource = {
    beginDrag(props) {
        return {...props, startDragging: true}
    },
    canDrag(props, monitor) {
        return props.canDrag
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
        const { event, isDragging, connectDragSource, startDrag, collisions, switchDrag } = this.props;
        console.log(switchDrag)

        const myCollisions = collisions[event.id];
        const order = myCollisions.order;


        return connectDragSource(
            <div style={{
                gridColumnStart: order,
                gridColumnEnd: order + 1,
                display: isDragging ? "none" : "inline",
                width: "100%",
                background: event.color,
                borderRadius: 10
            }}>
                <Resizable enable={{ top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
                           defaultSize={{ width: "100%", height: parseInt(getHeightOfEvent(event)) - 3}}
                           onResizeStart={switchDrag}
                           onResizeStop={switchDrag}
                >
                    <div className="event" style=
                        {{
                            background: event.color,
                            height: parseInt(getHeightOfEvent(event)) - 15,
                            opacity: startDrag ? 0.5 : 1,
                        }}>
                    <p style={{ fontSize: 10 }}>
                        {event.title} <br/>
                        Start: {new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} <br/>
                        End: {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
                    </p>

                    </div>
                    <div className='resize-rect_1'/>
                    <div className='resize-rect_2'/>
            </Resizable>
            </div>
        );
    }
}

export default DragSource('event', eventSource, collect)(Event)