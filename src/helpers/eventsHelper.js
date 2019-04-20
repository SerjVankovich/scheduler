import config from "../config";

export const isInThisWeek = (date, week) => {
    return date.valueOf() > week[0].valueOf() && date.valueOf() < week[week.length - 1].valueOf()
};

export const getEventColor = () => {
    const colors = config.colors;

    const index = Math.floor(Math.random() * colors.length);

    return colors[index]
};

export const getHeightOfEvent = (event) => {
    const dateStart = new Date(event.start);
    const dateEnd = new Date(event.end);

    const durationHour = dateEnd.getHours() - dateStart.getHours();
    const durationMinutes = dateEnd.getMinutes() - dateStart.getMinutes();

    const duration = durationHour + durationMinutes / 60;

    return duration * config.cellHeight
};

const meInside = (eventStart, evStart, eventEnd, evEnd) => (eventStart > evStart && eventStart < evEnd) || (eventEnd <= evEnd && eventEnd > evStart);
const meWrap = (eventStart, evStart, eventEnd, evEnd) => (evStart >= eventStart ) && (evEnd <= eventEnd);

export const isCollision = (event1, event2) => {
        const event1Start = new Date(event1.start).getHours() + new Date(event1.start).getMinutes() / 60;
        const event1End = new Date(event1.end).getHours() + new Date(event1.end).getMinutes() / 60;

        const event2Start = new Date(event2.start).getHours() + new Date(event2.start).getMinutes() / 60;
        const event2End = new Date(event2.end).getHours() + new Date(event2.end).getMinutes() / 60;

        const dayEvent1 = new Date(event1.start).getDay();
        const dayEvent2 = new Date(event2.start).getDay();

        return (meInside(event1Start, event2Start, event1End, event2End) || meWrap(event1Start, event2Start, event1End, event2End)) && (dayEvent1 === dayEvent2) && event1.id !== event2.id;

};

export const fillCollisions = events => {
    const collisions = {};
    events.forEach(event => {
        const meCollisions = [];

        events.forEach(event2 => {
            if (isCollision(event, event2)) {
                if (event.order === 1) {
                    event2.order += meCollisions.length + 1;
                }
                meCollisions.push(event2)
            }
        });

        collisions[event.id] = {
            collisions: meCollisions,
            order: event.order
        }
    });
     return collisions
};

export const findMaxOrder = (eventId, collisions) => {
    let maxOrder = collisions[eventId].order;
    collisions[eventId].collisions.forEach(collision => {
        if (collision.order > maxOrder) {
            maxOrder = collision.order
        }
        collisions[collision.id].collisions.forEach(col => {
            if (col.order > maxOrder) {
                maxOrder = col.order
            }
        })
    });

    return maxOrder
};

const _findMaxOrder = (order, collisions, state) => {
    let maxOrder = order;
    collisions.forEach(collision => {
        const order = state[collision.id].order;
        if (order > maxOrder){
            maxOrder = order
        }
    });
    return maxOrder
};

export const findMaxOrderInCollision = (collisions, state) => _findMaxOrder(1, collisions, state);

export const getOrder = (event, collisions) => {
    return collisions[event.id].order
};