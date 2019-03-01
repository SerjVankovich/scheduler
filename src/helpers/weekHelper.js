export const getDayOfWeek = (num) => {
    switch (num) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default: return "Undefined"
    }
};

export const getMonth = (num) => {
    if (num > 10) {
        return num + 1
    } else {
        num += 1;
        return "0" + num.toString()
    }
}

export const makeWeek = (weekStart) => {
    const _weekStart = new Date(weekStart.valueOf());
    const weekStartToArray = new Date(weekStart.valueOf());
    const week = [weekStartToArray];
    for (let i = 0; i < 6; i++) {
        let weekDay = new Date(_weekStart.setDate(_weekStart.getDate() + 1))
        week.push(weekDay)
    }

    return week
};

export const getDay = (num) => {
    if (num > 10) {
        return num
    } else {
        return "0" + num.toString()
    }
}