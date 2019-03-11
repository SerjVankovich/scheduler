import React from 'react'
import "./Event.css"
import {getHeightOfEvent} from "../../helpers/eventToIndexHelper";
import {DragSource} from "react-dnd";

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
    isDragging: monitor.isDragging(),
    item: monitor.getItem()
});

class Event extends React.Component {
    componentDidMount() {
        this.props.connectDragPreview(new Image())
    }

    render() {
        const { event, isDragging, connectDragSource, startDrag, numOfEvents} = this.props;
        // font-size: calc(16px + 6 * ((100vw - 320px) / 680));
        const eventHeight = parseInt(getHeightOfEvent(event)) - 2;
        const fontBase = eventHeight< 50 ? '11' : '14';
        const width = startDrag ? 100 / (numOfEvents + 1) + "%" : numOfEvents > 1 ? 100 / numOfEvents + "%" : "100%";
        console.log(startDrag);
        return connectDragSource(
            <div className="event" style=
                {{
                    background: event.color,
                    height: eventHeight,
                    display: isDragging ? "none" : "inline",
                    opacity: startDrag ? 0.5 : 1,
                    fontSize: `${fontBase}px`,
                    width
                }}> 
                    {event.title} <br/>
                    <div style={{width:'100%',whiteSpace:'normal'}}>{new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} 
                    <span> - </span>{new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}</div>
                 
            </div>

        );
    }
}

export default DragSource('event', eventSource, collect)(Event)