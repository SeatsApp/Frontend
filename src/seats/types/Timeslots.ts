export function getTimeslots() {
    const timeslots = [];
    for (let i = 0; i < 23; i++) {
        timeslots[i] = {label: (i < 10 ? "0" + i : i) + "h" , value: (i < 10 ? "0" + i : i) + ":00"}
    }
    return timeslots;
}