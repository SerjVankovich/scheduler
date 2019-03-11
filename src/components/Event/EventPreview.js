import React from 'react'
import {DragLayer} from "react-dnd";
import {getHeightOfEvent} from "../../helpers/eventToIndexHelper";

const collect = (monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
});

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};

function getItemStyles(currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    };
}

class EventLayer extends React.Component {
    render() {
        const { item, isDragging, currentOffset, lastHoveredSubCell} = this.props;
        if (!isDragging) {
            return null
        }
        function renderItem(type, item) {
            switch (type) {
                case "event":
                    return (
                        <EventPreview hoveredSubCell={lastHoveredSubCell} item={item} event={item.event}/>
                    );
                default: return null
            }
        }

        return (
            <div style={layerStyles}>
                <div className='event' style={getItemStyles(currentOffset)}>
                    {/* {renderItem("event", item)} */}
                </div>
            </div>

        )

    }
}

const getDuration = (event) => {
        const hoursDuration = new Date(event.end).getHours() - new Date(event.start).getHours();
        const minutesDuration = new Date(event.end).getMinutes() - new Date(event.start).getMinutes();
        return {
            hoursDuration,
            minutesDuration
        }
}

const getStart = (subCell, item) => {
        console.log(subCell, item)
        return {
            startHours: subCell.address[0] + item.dayStart,
            startMinutes: subCell.num * item.delimiter
        }
}

const getEnd = (subCell, event, item) => {
        const start = getStart(subCell, item);
        const startDate = new Date(event.start);
        startDate.setHours(start.startHours);
        startDate.setMinutes(start.startMinutes);

        const endDate = new Date(startDate.valueOf());
        endDate.setHours(startDate.getHours() + getDuration(event).hoursDuration);
        endDate.setMinutes(startDate.getMinutes() + getDuration(event).minutesDuration);
        return {
            endHours: endDate.getHours(),
            endMinutes: endDate.getMinutes()
        }
}



export const EventPreview = ({ event, hoveredSubCell, item}) => {
        const eventHeight = parseInt(getHeightOfEvent(event)) - 2;
        const fontBase = eventHeight< 50 ? '11' : '14';
        const suspect =hoveredSubCell.events.find(x => x && item && item.event && x.id===item.event.id);
        const numEvents = suspect ? hoveredSubCell.events.length: hoveredSubCell.events.length + 1;
        return (
        
        <div className='event-preview' style={{
                width: 100 / (numEvents) + "%",
                background: event.color,
                height: parseInt(getHeightOfEvent(event)) - 2,
                fontSize: `${fontBase}px`,
            }}>
            <div>
                {event.title} <br/>
                {hoveredSubCell ?
                    <div style={{
                        overflow: "auto",
                        width:'100%',
                        whiteSpace:'normal'
                    }}>
                        {getStart(hoveredSubCell, item).startHours}:{getStart(hoveredSubCell, item).startMinutes}
                        <span> - </span>
                        {getEnd(hoveredSubCell, event, item).endHours}:{getEnd(hoveredSubCell, event, item).endMinutes}
                    </div>
                    :
                    <div style={{
                        overflow: "auto",
                        width:'100%',
                        whiteSpace:'normal'
                    }
                    }>
                        {new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} 
                        <span> - </span>
                        {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
                    </div>
                    }

            </div>
        </div>
)};

export default DragLayer(collect)(EventLayer)