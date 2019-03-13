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
        const { item, isDragging, currentOffset, lastHoveredSubCell, setSubCellDirection} = this.props;
        if (!isDragging) {
            return null
        }
        function renderItem(type, item) {
            switch (type) {
                case "event":
                    return (
                        <EventPreview setSubCellDirection={setSubCellDirection} hoveredSubCell={lastHoveredSubCell} item={item} event={item.event}/>
                    );
                default: return null
            }
        }

        return (
            <div style={layerStyles}>
                <div className='event' style={getItemStyles(currentOffset)}>
                    {renderItem("event", item)}
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

const meInside = (eventStart, evStart, eventEnd, evEnd) => (eventStart > evStart && eventStart < evEnd) || (eventEnd <= evEnd && eventEnd > evStart);
const meWrap = (eventStart, evStart, eventEnd, evEnd) => (evStart >= eventStart ) && (evEnd <= eventEnd);

const isCollision = (subCell, event, events, item) => {
        return events.filter(ev => {
            const evStart = new Date(ev.start).getHours() + new Date(ev.start).getMinutes() / 60;
            const evEnd = new Date(ev.end).getHours() + new Date(ev.end).getMinutes() / 60;

            const eventStart = getStart(subCell, item).startHours + getStart(subCell, item).startMinutes / 60;
            const eventEnd = getEnd(subCell, event, item).endHours + getEnd(subCell, event, item).endMinutes / 60;

            const dayEvent = subCell.address[1] === 6 ? 0 : subCell.address[1] + 1;
            const dayEv = new Date(ev.start).getDay();

            return (meInside(eventStart, evStart, eventEnd, evEnd) || meWrap(eventStart, evStart, eventEnd, evEnd)) && (dayEv === dayEvent) && event.id !== ev.id;

        })
};



export const EventPreview = ({ event, hoveredSubCell, item, events, setSubCellDirection, setCollisionNum, lastHoveredSubCell}) => {
        const eventsCollisions = isCollision(hoveredSubCell, event, events, item);
        let max = 0;

        eventsCollisions.forEach(event => {
            max = event.num > max ? event.num : max
        });

        if (eventsCollisions.length !== 0) {
            setCollisionNum(event.id, eventsCollisions.length);
            eventsCollisions.forEach(eventCol => {
                setCollisionNum(eventCol.id, 1)
            });
            setSubCellDirection(lastHoveredSubCell, "row")
            setSubCellDirection(hoveredSubCell, "row-reverse");
        }

        return (
        <div className='event-preview' style={{
                width: hoveredSubCell.events.length !== 0 ? 100 / (hoveredSubCell.events.length + 1) + "%" : 100 / (max + 1) + "%",
                background: event.color,
                height: parseInt(getHeightOfEvent(event)) - 2,
            }}>
            <h6>
                {event.title} <br/>
                {hoveredSubCell ?
                    <div style={{
                    overflow: "auto"
                    }}>
                        Start: {getStart(hoveredSubCell, item).startHours}:{getStart(hoveredSubCell, item).startMinutes} <br/>
                        End: {getEnd(hoveredSubCell, event, item).endHours}:{getEnd(hoveredSubCell, event, item).endMinutes}
                    </div>
                    :
                    <div style={{
                        overflow: "auto"
                    }
                    }>
                        Start: {new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} <br/>
                        End: {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
                    </div>
                    }

            </h6>
        </div>
)
                }

export default DragLayer(collect)(EventLayer)