import {Button} from "react-native-paper";
import React from "react";
import {DatePickerModal} from "react-native-paper-dates";
import {View} from "react-native";

interface Props {
    updateState: (date: Date) => void
    date: Date
}

export default function DatePicker({updateState, date}: Props) {
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            updateState(params.date);
        },
        [setOpen, updateState]
    );

    return (
        <View style={{margin: 5}}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode={'contained'}>
                {date.toLocaleDateString()}
            </Button>
            <DatePickerModal
                locale="nl"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
        </View>
    )
}

