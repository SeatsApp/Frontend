export function getDateTimeString(date: Date, time: string): string {
    const stringDateTime = date.toJSON();
    const dateTimeArray = stringDateTime.split("T")[0];
    return dateTimeArray + " " + time + ":00"
}

export function getDate(dateTime: string): string {
    return dateTime.split(" ")[0];
}

export function getTime(dateTime: string): string {
    const fullTime = dateTime.split(" ")[1];
    return fullTime.split(":")[0];
}

export function getEndTime(dateTime: string): string {
    const fullTime = getTime(dateTime)
    return (parseInt(fullTime) === 0 ? "24" : fullTime)
}