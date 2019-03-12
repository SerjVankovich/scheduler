import React from 'react'
import {Rnd} from 'react-rnd'
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
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  };
class Event extends React.Component {
    constructor(props) {
        super(props);
        const { event, numOfEvents, index } = props;
        const eventHeight = parseInt(getHeightOfEvent(event)) - 2;
        const fontBase = eventHeight< 50 ? '11' : '14';
        const width = numOfEvents > 1 ? 200 / numOfEvents : 200;
        const offset = index === 0 ? 0 : index * 200/numOfEvents;
        this.state = {
          width,
          height: eventHeight,
          x: offset,
          y: 0
        };
      }
    componentDidMount() {
        // this.props.connectDragPreview(new Image())
    }

    render() {
        const { event, isDragging, connectDragSource, startDrag, numOfEvents} = this.props;
        // font-size: calc(16px + 6 * ((100vw - 320px) / 680));
        // const eventHeight = parseInt(getHeightOfEvent(event)) - 2;
        // const fontBase = eventHeight< 50 ? '11' : '14';
        // const width = startDrag ? 100 / (numOfEvents + 1) + "%" : numOfEvents > 1 ? 100 / numOfEvents + "%" : "100%";
        // console.log(startDrag);
        return (<Rnd
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
        
        resizeGrid={[200, 25]}
        dragGrid={[200, 25]}
      >
        {event.title} <br/>
        <div style={{width:'100%',whiteSpace:'normal'}}>{new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} 
        <span> - </span>{new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}</div>
      </Rnd>);
        // return connectDragSource(
        //     <div className="event" style=
        //         {{
        //             background: event.color,
        //             height: eventHeight,
        //             display: isDragging ? "none" : "inline",
        //             opacity: startDrag ? 0.5 : 1,
        //             fontSize: `${fontBase}px`,
        //             width
        //         }}> 
        //             {event.title} <br/>
        //             <div style={{width:'100%',whiteSpace:'normal'}}>{new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} 
        //             <span> - </span>{new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}</div>
                 
        //     </div>

        // );
    }
}

// export default DragSource('event', eventSource, collect)(Event)
export default Event;