import React from 'react'
import {Card, Button, Title, Paragraph, Portal} from 'react-native-paper';
import {Seat} from '../types/Seat'
import useSeat from "../../shared/hooks/useSeat";
import {DeviceEventEmitter, View} from "react-native";
import ReserveSeatDialog from "./ReserveSeatDialog";

interface CardSeatProps {
    seat: Seat
}

export default function CardSeat({seat}: CardSeatProps) {
    const {deleteSeat} = useSeat();
    const [dialogVisible, setDialogVisible] = React.useState(false);

    return (
        <View>
            <Portal>
                <ReserveSeatDialog visible={dialogVisible} setDialogVisible={setDialogVisible} seat={seat}/>
            </Portal>
                <Card style={{margin: 5}}>
                    <Card.Content>
                        <Title>{seat.name}</Title>
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