import React, {Dispatch, SetStateAction, useState} from 'react'
import {ScrollView, View} from "react-native";
import DayShortcutButtons from "./DayShortcutButtons";
import TimePicker from "../../dateTimePicker/components/TimePicker";
import {Button, Card, Dialog, IconButton, Title} from "react-native-paper";
import {theme} from "../../../theme";

interface DialogProps {
    setStartTime: Dispatch<SetStateAction<string>>;
    setEndTime: Dispatch<SetStateAction<string>>;
    startTime: string;
    endTime: string;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function FilterDialog({setEndTime, setStartTime, setVisible, startTime, endTime, visible}: DialogProps) {
    const [chosenStartTime, setChosenStartTime] = useState<string>(startTime);
    const [chosenEndTime, setChosenEndTime] = useState<string>(endTime);

    const onClick = () => {
        setStartTime(chosenStartTime)
        setEndTime(chosenEndTime)
        setVisible(false)
    }

    return (
        <Dialog onDismiss={() => setVisible(false)} visible={visible}>
            <View style={{
                flexShrink: 1,
                height: '100%',
                width: '100%'
            }}>
                <View style={{
                    height: '100%', alignSelf: 'center',
                    margin: 5, display: 'flex', flexDirection: 'column'
                }}>
                    <IconButton testID={'iconButton'} style={{alignSelf: 'flex-end'}} icon={'close'} onPress={() => setVisible(false)}/>
                    <ScrollView style={{width: '100%'}}>
                        <Card style={{margin: 5}}>
                            <Card.Content>
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    <Title>Available:</Title>
                                    <ScrollView horizontal>
                                        <DayShortcutButtons chosenStartTime={chosenStartTime}
                                                            chosenEndTime={chosenEndTime}
                                                            setStartTime={setChosenStartTime}
                                                            setEndTime={setChosenEndTime}/>
                                    </ScrollView>
                                </View>
                            </Card.Content>
                        </Card>
                        <Card style={{margin: 5}}>
                            <Card.Content>
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    <Title>Custom time:</Title>
                                    <TimePicker setStartTime={setChosenStartTime} setEndTime={setChosenEndTime}
                                                startTime={chosenStartTime} endTime={chosenEndTime}/>
                                </View>
                            </Card.Content>
                        </Card>
                    </ScrollView>
                    <Button onPress={onClick} style={{marginBottom: 10}} mode={'contained'}
                            color={theme.colors.accent}>Filter</Button>
                </View>
            </View>
        </Dialog>
    );
}
