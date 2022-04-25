import React from 'react'
import { useForm } from 'react-hook-form';
import { View, Text, Button, StyleSheet, DeviceEventEmitter } from 'react-native'
import { FormBuilder } from 'react-native-paper-form-builder';
import useSeat from '../../shared/hooks/useSeat';


export default function CreateSeat() {
    const { createSeat } = useSeat();
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            name: '',
        },
        mode: 'onChange',
    });

    return (
        <View>
            <Text style={styles.headingStyle}>Create Seat</Text>
            <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                    {
                        type: 'text',
                        name: 'name',
                        rules: {
                            required: {
                                value: true,
                                message: 'Name is required',
                            },
                        },
                    },
                ]}
            />
            <Button
                title='Submit'
                onPress={handleSubmit( async (data) => {
                    await createSeat(data.name);
                    DeviceEventEmitter.emit("event.refetchSeats", {});
                })}>
                Submit
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    scrollViewStyle: {
        padding: 10,
        justifyContent: 'center',
    },
    headingStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 40,
    },
});

