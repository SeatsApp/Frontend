import useGetSeatStatus from "../../src/seats/hooks/useGetSeatStatus";
import { SeatStatus } from "../../src/seats/types/SeatStatus";

test("should return the status available", async () => {
    // Act
    const seatStatus = useGetSeatStatus({
        id: 0,
        name: "",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        seatStatus: SeatStatus[SeatStatus.AVAILABLE].toString(),
        reservations: []
    }, "0", "24");

    // Assert
    expect(seatStatus).toStrictEqual(SeatStatus[SeatStatus.AVAILABLE].toString());
});

test("should return the status unavailable", async () => {
    // Act
    const seatStatus = useGetSeatStatus({
        id: 0,
        name: "",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        seatStatus: SeatStatus[SeatStatus.UNAVAILABLE].toString(),
        reservations: []
    }, "0", "24");

    // Assert
    expect(seatStatus).toStrictEqual(SeatStatus[SeatStatus.UNAVAILABLE].toString());
});

test("should return the status partially booked before filter start time", async () => {
    // Act
    const seatStatus = useGetSeatStatus({
        id: 0,
        name: "",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        seatStatus: SeatStatus[SeatStatus.PARTIALLY_BOOKED].toString(),
        reservations: [{ id: 5, startDateTime: "27-05-2022 3:00", endDateTime: "27-05-2022 10:00", checkedIn: false }]
    }, "5", "24");

    // Assert
    expect(seatStatus).toStrictEqual(SeatStatus[SeatStatus.PARTIALLY_BOOKED].toString());
});

test("should return the status fully booked over filter time", async () => {
    // Act
    const seatStatus = useGetSeatStatus({
        id: 0,
        name: "",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        seatStatus: SeatStatus[SeatStatus.PARTIALLY_BOOKED].toString(),
        reservations: [{ id: 5, startDateTime: "27-05-2022 3:00", endDateTime: "27-05-2022 20:00", checkedIn: false }]
    }, "5", "10");

    // Assert
    expect(seatStatus).toStrictEqual(SeatStatus[SeatStatus.FULLY_BOOKED].toString());
});

test("should return the status partially booked in filter time", async () => {
    // Act
    const seatStatus = useGetSeatStatus({
        id: 0,
        name: "",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        seatStatus: SeatStatus[SeatStatus.PARTIALLY_BOOKED].toString(),
        reservations: [{ id: 5, startDateTime: "27-05-2022 3:00", endDateTime: "27-05-2022 8:00", checkedIn: false },
        { id: 6, startDateTime: "27-05-2022 8:00", endDateTime: "27-05-2022 10:00", checkedIn: false }]
    }, "2", "11");

    // Assert
    expect(seatStatus).toStrictEqual(SeatStatus[SeatStatus.PARTIALLY_BOOKED].toString());
});