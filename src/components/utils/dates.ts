type EventDate = {
    day: number;
    month: number;
    year: number;
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const getWeekday = (date: Date | string | EventDate) => {
    if (typeof date === "string") {
        date = new Date(date);
    }
    else if (!(date instanceof Date)) {
        date = new Date(date.year, date.month - 1, date.day); // month is zero indexed in Date object
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}


export { months, getWeekday };