import React from 'react'
import { Card, Button, Title, Paragraph, Portal, Text } from 'react-native-paper';
import { Seat } from '../types/Seat'
import useSeat from "../../shared/hooks/useSeat";
import { DeviceEventEmitter, View } from "react-native";
import ReserveSeatDialog from "./ReserveSeatDialog";
import useStatusColor from '../hooks/UseStatusColor';
import { SeatStatus } from '../types/SeatStatus';

interface CardSeatProps {
    seat: Seat,
    date: Date
}

export default function CardSeat({ seat, date }: CardSeatProps) {
    const { deleteSeat } = useSeat();
    const [dialogVisible, setDialogVisible] = React.useState(false);

    return (
        <View>
            <Portal>
                <ReserveSeatDialog date={date} visible={dialogVisible} setDialogVisible={setDialogVisible} seat={seat} />
            </Portal>
            <Card style={{ margin: 5 }}>
                <Card.Content>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Title style={{ marginRight: 4 }}>{seat.name}</Title>
                        <Text style={{ color: useStatusColor(SeatStatus[seat.seatStatus]) }}>
                            {seat.seatStatus.toString().replace("_", " ")}
                        </Text>
                    </View>
                    <Paragraph>Floor</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={async () => {
                        setDialogVisible(true);
                    }}>Reserve</Button>
                    <Button onPress={async () => {
                        await deleteSeat(seat.id);
                        DeviceEventEmitter.emit("event.refetchSeats", {});
                    }}>Delete</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}