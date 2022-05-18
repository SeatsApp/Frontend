import useStatusColor from "../src/seats/hooks/UseStatusColor";
import { SeatStatus } from "../src/seats/types/SeatStatus";

test("should return the color for partially booked", async () => {
    // Act
    const color = useStatusColor(SeatStatus.PARTIALLY_BOOKED.toString());

    // Assert
    expect(color).toStrictEqual("orange");
});

test("should return the color for available", async () => {
    // Act
    const color = useStatusColor(SeatStatus.AVAILABLE.toString())

    // Assert
    expect(color).toStrictEqual("#00bf5f");
});

test("should return the color for unavailable", async () => {
    // Act
    const color = useStatusColor(SeatStatus.UNAVAILABLE.toString())

    // Assert
    expect(color).toStrictEqual("gray");
});

test("should return the color for fully booked", async () => {
    // Act
    const color = useStatusColor(SeatStatus.FULLY_BOOKED.toString())

    // Assert
    expect(color).toStrictEqual("red");
});