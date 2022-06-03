import {Button} from "react-native-paper";
import React from "react";
import {View} from "react-native";
import {DatePickerModal} from "react-native-paper-dates";
import {theme} from "../../../theme";

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
        <View style={{width: '50%'}}>
            <Button labelStyle={{color: theme.colors.accent}} color={theme.colors.accent} icon={'calendar'} onPress={() => setOpen(true)} uppercase={false}>
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

