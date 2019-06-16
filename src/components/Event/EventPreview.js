import React from 'react'
import {getHeightOfEvent} from "../../helpers/eventsHelper";


const getDuration = (event) => {
        const hoursDuration = new Date(event.end).getHours() - new Date(event.start).getHours();
        const minutesDuration = new Date(event.end).getMinutes() - new Date(event.start).getMinutes();
        return {
            hoursDuration,
            minutesDuration
        }
}

const getStart = (subCell, item, event) => {
        return item === null ?
            {
                startHours: new Date(event.start.valueOf()).getHours(),
                startMinutes: new Date(event.start.valueOf()).getMinutes()
            }
            :
            {
                startHours: subCell.address[0] + item.dayStart,
                startMinutes: subCell.num * item.delimiter
            }
}

const getEnd = (subCell, event, item) => {
        const start = getStart(subCell, item, event);
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

export const isCollision = (subCell, event, events, item) => {
        return events.filter(ev => {
            const evStart = new Date(ev.start).getHours() + new Date(ev.start).getMinutes() / 60;
            const evEnd = new Date(ev.end).getHours() + new Date(ev.end).getMinutes() / 60;

            const eventStart = getStart(subCell, item, event).startHours + getStart(subCell, item, event).startMinutes / 60;
            const eventEnd = getEnd(subCell, event, item).endHours + getEnd(subCell, event, item).endMinutes / 60;

            const dayEvent = subCell ? subCell.address[1] === 6 ? 0 : subCell.address[1] + 1 : new Date(event.start).getDay();
            const dayEv = new Date(ev.start).getDay();

            return (meInside(eventStart, evStart, eventEnd, evEnd) || meWrap(eventStart, evStart, eventEnd, evEnd)) && (dayEv === dayEvent) && event.id !== ev.id;

        })
};



export const EventPreview = ({ event, hoveredSubCell, item, events}) => {
        const eventsCollisions = isCollision(hoveredSubCell, event, events, item);

        const order = eventsCollisions.length + 1;

        return (
        <div className='event-preview' style={{
                gridColumnStart: order,
                gridColumnEnd: order + 1,
                width: "12.5%",
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