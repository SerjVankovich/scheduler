import React from 'react'
import Event from "../Event/Event";
import {DropTarget} from "react-dnd";
import { EventPreview } from "../Event/EventPreview";

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
};

const specCell = {
    drop(props, monitor, component) {
        return {address: props.address, subCell: props.num}
    },
};

class SubCell extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        if (props.hovered) {
            props.setSubCellHovered(props.me, props.num)
        }
        this.state = {
            width: 10,
            height: 10
        }
        this.celldiv = React.createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    updateWindowDimensions() {  
        const divWidth = this.celldiv.current.offsetWidth;
        // console.log(divWidth);
        if ( window.innerWidth !== this.state.width) { 
            this.setState({  
                width: window.innerWidth, 
                height: window.innerHeight,
                divWidth
                // tableWidth: ReactDOM.findDOMNode(this._tableTarget).offsetWidth
            });
        }
        // console.log(this.state);
    }
    componentDidMount() {
       // const divWidth = this.celldiv.current.offsetWidth;
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    render() {
        const {address, delimiter, num, me, dayStart, deleteEvent, replaceEvent, connectDropTarget, hovered, item} = this.props;

        return connectDropTarget(
            <div ref={this.celldiv} className="subCell" style=
                {{
                    height: 100 / (60 / delimiter) + "%",
                    background: hovered ? "grey" : "white",
                    borderBottomWidth: ((num + 1) === 60 / delimiter) ? 0 : 1
                }}>
                {me.events.map((event, i) => (
                    <Event numOfEvents={me.events.length} startDrag={item ? item.startDragging : false} index={i}
                    delimiter={delimiter} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} 
                    width={this.state.width} height={this.state.height} divWidth={this.state.divWidth}
                    address={address} event={event} subCell={num} key={i} />
                ))}
                { hovered ?
                    <EventPreview event={item.event} hoveredSubCell={me} item={item}/>
                    :
                    null
                }
            </div>
        );
    }
}

export default DropTarget('event', specCell, collect)(SubCell)