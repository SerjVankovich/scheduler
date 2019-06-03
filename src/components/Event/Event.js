import React from 'react'
import "./Event.css"
import {findMaxOrder, getHeightOfEvent} from "../../helpers/eventsHelper";
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

        const {event, address, index, dayStart, delimiter} = props;
        const cellId = monitor.getDropResult().address;
        const subCell = monitor.getDropResult().subCell;
        props.replaceEvent(cellId, event, dayStart, subCell, delimiter);
        props.deleteEvent(address, index, props.subCell.num);
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    item: monitor.getItem()
});

const wrapMe = (subCell, collisions, events, cb) => {
    collisions.forEach(collision => {
        const cols = isCollision(subCell, collision, events, null);
        cb(collision, cols)
    })
};

class Event extends React.Component {

    componentDidMount() {
        this.props.connectDragPreview(new Image());
    }

    handleResize = (event) => mouseEvent => {
        const { offset } = event;
        const offsetMouse = mouseEvent.pageY;
        console.error(event.end);
        if  (offset === undefined) {
            this.props.resizeEvent(event.id, null, offsetMouse)
        } else {
            const difference = offsetMouse - offset;
            const subCellHeight = config.cellHeight / (60 / config.delimiter);

            if (Math.abs(difference) > subCellHeight) {
                const inc = difference > 0 ? config.delimiter : -1 * config.delimiter;
                event.end = new Date(event.end.valueOf()).setMinutes(new Date(event.end.valueOf()).getMinutes() + inc);
                const collisions = isCollision(this.props.subCell, event, this.props.events, null);

                if (collisions.length !== 0) {
                    const trulyOrder = this.props.collisions[event.id].order;
                    const collisionsBefore = collisions.filter(collision => collision.order < trulyOrder);
                    const collisionsAfter = collisions.filter(collision => collision.order >= trulyOrder);
                    wrapMe(this.props.subCell, collisionsAfter, this.props.events, this.props.replaceCollisions);
                    if (collisionsBefore.length > 0) {
                        this.props.replaceCollisions(event, collisionsBefore)
                    }
                } else if (this.props.collisions[event.id].collisions.length !== 0) {
                   this.props.clearCollisions(event)
                }
                if (event.end.valueOf() > new Date(event.start).valueOf()){
                    return this.props.resizeEvent(event.id, inc, offsetMouse)
                }

            }

        }
    };

    render() {
        const { isDragging, connectDragSource, startDrag, collisions, switchDrag, event } = this.props;
        const myCollisions = collisions[event.id];
        const order = myCollisions.order;

        // This is solution of drag area problem, but it will provide new problems in production
        const width = (window.innerWidth / 8) / findMaxOrder(event.id, collisions);

        return connectDragSource(
            <div style={{
                overflow: 'visible',
                zIndex: 2,
                gridColumnStart: order,
                gridColumnEnd: order + 1,
                display: isDragging ? "none" : "inline",
                background: event.color,
                borderRadius: 10,
                width: '100%',
                height: getHeightOfEvent(event) - 3
            }}>
                <Resizable enable={{ top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
                           defaultSize={{ width: "100%", height: parseInt(getHeightOfEvent(event)) - 3}}
                           size={{ width: "100%", height: parseInt(getHeightOfEvent(event)) - 3}}
                           onResizeStart={switchDrag}
                           onResize={this.handleResize(event)}
                           onResizeStop={switchDrag}
                >
                    <div className="event" style=
                        {{
                            height: parseInt(getHeightOfEvent(event)) - 15,
                            opacity: startDrag ? 0.5 : 1,
                            width: "100%"
                        }}>
                    <p style={{ fontSize: 10}}>
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