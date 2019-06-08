import Constants from '../actions/constants'
import {getHeightOfEvent} from "../helpers/eventsHelper";

export default function events(state={}, action) {
    switch (action.type) {
        case Constants.REPLACE_EVENT:
            const hours = action.cellAddress[0];
            let day = action.cellAddress[1];
            if (day === 6) {
                day = 0
            } else {
                day++
            }
            state.events.forEach(event => {
                if (event.id === action.event.id) {
                    const eventDate = new Date(event.start);
                    const eventEnd = new Date(event.end);
                    const duration = eventEnd.getHours() - eventDate.getHours();
                    const durationMinutes = eventEnd.getMinutes() - eventDate.getMinutes();

                    const differenceWeekDay = day - eventDate.getDay();
                    const differenceHour = hours + action.dayStart;
                    eventDate.setDate(eventDate.getDate() + differenceWeekDay);
                    eventDate.setHours(differenceHour);
                    eventDate.setMinutes(action.delimiter * action.subCell);
                    eventEnd.setDate(eventEnd.getDate() + differenceWeekDay);
                    eventEnd.setHours(eventDate.getHours()  + duration);
                    eventEnd.setMinutes(eventDate.getMinutes() + durationMinutes);
                    event.start = eventDate;
                    event.end = eventEnd
                }
            });
            return {...state};
        case Constants.SET_END_TIME:
            state.events.forEach(event => {
                if (event.id === action.eventId) {
                    const eventDateEnd = new Date(event.end.valueOf());
                    event.end = eventDateEnd.setMinutes(eventDateEnd.getMinutes() + action.time);
                }
            });
            return {...state};
        case Constants.RESIZE_EVENT:
            state.events = state.events.map(event => {
                if (event.id === action.eventId) {
                    event.end = new Date(event.end.valueOf()).setMinutes(new Date(event.end.valueOf()).getMinutes() + action.incrementedMinutes);
                    event.height = parseInt(getHeightOfEvent(event))
                }

                return event
            });

            return {...state};
        default: return state
    }
}