import React from 'react'
import "./Event.css"
import {getHeightOfEvent} from "../../helpers/eventsHelper";
import {DragSource} from "react-dnd";
import {isCollision} from "./EventPreview";
import Resizable from "re-resizable";
import config from "../../config";

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

    constructor(props) {
        super(props);
        this.state = {
            event: props.event
        }
    }

    componentDidMount() {
        this.props.connectDragPreview(new Image())
    }

    handleResize = (offsetTop, event) => mouseEvent => {
        const offset = mouseEvent.y - offsetTop - parseInt(getHeightOfEvent(event)) + 7;
        const subCells = Math.round(offset / (config.cellHeight / (60 / config.delimiter)));
        event.end = new Date( event.end.valueOf()).setMinutes(new Date(event.end.valueOf()).getMinutes() + subCells * config.delimiter);
        const collisions = isCollision(this.props.subCell, event, this.props.events, null);

        if (collisions.length !== 0) {
            this.props.replaceCollisions(event, collisions)
        } else {
            this.props.clearCollisions(event)
        }
        this.setState({
            event: event
        });
        //setEndTime(event.id, subCells * config.delimiter);
        //switchDrag()
    };

    render() {
        const { isDragging, connectDragSource, startDrag, collisions, switchDrag, address, subCell } = this.props;
        const { event } = this.state;

        const myCollisions = collisions[event.id];
        const order = myCollisions.order;
        const offsetTop = (address[0] + 1 + subCell.num / (60 / config.delimiter)) * config.cellHeight;

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
                           defaultSize={{ width: "100%", height: parseInt(getHeightOfEvent(event)) + 5}}
                           onResizeStart={switchDrag}
                           onResize={this.handleResize(offsetTop, event)}
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
            </Resizable>
            </div>
        );
    }
}

export default DragSource('event', eventSource, collect)(Event)