import React from 'react'
import {DragLayer} from "react-dnd";
import {getHeightOfEvent} from "../../helpers/eventToIndexHelper";

const collect = (monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
});

function getItemStyles(currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    //const { x, y } = currentOffset;
    const x=0;
    const y=0;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    };
}

class EventLayer extends React.Component {
    constructor(props) {
        super(props);
        this.lastUpdate = +new Date()
    }

    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (+new Date() - this.lastUpdate > 14) {
            this.lastUpdate = +new Date();
            return true
        } else {
            return false
        }
    } */

    render() {
        const { item, isDragging, currentOffset} = this.props;
        if (!isDragging) {
            return null
        }
        function renderItem(type, item) {
            switch (type) {
                case "event":
                    return (
                        <EventPreview event={item.event}/>
                    );
                default: return null
            }
        }

        return (
            <div className="event" style={getItemStyles(currentOffset)}>
                {renderItem("event", item)}
            </div>
        )

    }
}


const EventPreview = ({ event}) => (
        <div className='event-preview' style={{

                background: event.color,
                height: parseInt(getHeightOfEvent(event)) - 2,
            }}>
            <h6>
                {event.title} <br/>
                Start: {new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} <br/>
                End: {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
            </h6>
        </div>
);

export default DragLayer(collect)(EventLayer)