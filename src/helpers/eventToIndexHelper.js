export const isInThisWeek = (date, week) => {
    return date.valueOf() > week[0].valueOf() && date.valueOf() < week[week.length - 1].valueOf()
};