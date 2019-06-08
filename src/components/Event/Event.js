import React from 'react'
import "./Event.css"
import {findMaxOrder} from "../../helpers/eventsHelper";
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

    constructor(props) {
        super(props);

        this.state = {
            delta: 0,
            incMinutes: 0
        }

    }

    componentDidMount() {
        this.props.connectDragPreview(new Image());
    }

    handleResize = (mouseEvent, direction, ref, delta) => {
        const subCellHeight = config.cellHeight / (60 / config.delimiter);
        const inc = Math.floor(delta.height / subCellHeight);
        this.setState({
            delta: delta.height,
            incMinutes: inc * config.delimiter
        })
    };

    handleStopResize = (event) => {
        this.props.resizeEvent(event.id, this.state.incMinutes);
        const collisions = isCollision(this.props.subCell, event, this.props.events, null);
        const order = this.props.collisions[event.id].order;
        if (collisions.length > 0) {
            if (order === 1) {
                wrapMe(this.props.subCell, collisions, this.props.events, this.props.replaceCollisions)
            } else {
                this.props.replaceCollisions(event, collisions)
            }
        } else {
            this.props.clearCollisions(event)
        }
        this.setState({
            delta: 0,
            incMinutes: 0
        })
    };

    render() {
        const { isDragging, connectDragSource, startDrag, collisions, switchDrag, event } = this.props;
        const {delta, incMinutes} = this.state;
        const myCollisions = collisions[event.id];
        const order = myCollisions.order;

        // This is solution of drag area problem, but it will provide new problems in production
        const width = (window.innerWidth / 8) / findMaxOrder(event.id, collisions);
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        endDate.setMinutes(new Date(event.end).getMinutes() + incMinutes);

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
                height: event.height - 3 + delta
            }}>
                <Resizable enable={{ top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
                           defaultSize={{width: "100%", height: event.height - 3 + delta}}
                           size={{width: "100%", height: event.height - 3 + delta}}
                           onResizeStart={switchDrag}
                           onResize={this.handleResize}
                           onResizeStop={() => {
                               switchDrag();
                               this.handleStopResize(event)
                           }}
                >
                    <div className="event" style=
                        {{
                            height: event.height - 15 + delta,
                            opacity: startDrag ? 0.5 : 1,
                            width: "100%"
                        }}>
                        <p style={{fontSize: 10}}>
                            {event.title} <br/>
                            Start: {startDate.getHours()}:{startDate.getMinutes()} <br/>
                            End: {endDate.getHours()}:{endDate.getMinutes()}
                        </p>

                    </div>
                </Resizable>
            </div>
        );
    }
}

export default DragSource('event', eventSource, collect)(Event)