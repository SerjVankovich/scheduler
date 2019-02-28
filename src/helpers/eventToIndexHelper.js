import config from "../config";

export const isInThisWeek = (date, week) => {
    return date.valueOf() > week[0].valueOf() && date.valueOf() < week[week.length - 1].valueOf()
};

export const getMarginOfEvent = (event) => {
    const date = new Date(event.start);
    return date.getMinutes() / 60 * config.cellSize
};

export const getHeightOfEvent = (event) => {
    const dateStart = new Date(event.start);
    const dateEnd = new Date(event.end);

    const durationHour = dateEnd.getHours() - dateStart.getHours();
    const durationMinutes = dateEnd.getMinutes() - dateStart.getMinutes();

    const duration = durationHour + durationMinutes / 60;

    return duration * config.cellSize
}