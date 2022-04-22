import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { RootStackParamList } from '../../../App';

type homeScreenProp = NavigationProp<RootStackParamList, 'Home'>;

export default function AddSeat() {
    const navigation = useNavigation<homeScreenProp>();

    const styles = StyleSheet.create({
        fab: {
            position: 'absolute',
            right: 0,
            bottom:0,
            margin:16
        },
    })

    return (
        <Portal>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => navigation.navigate('CreateSeat')}
            />
        </Portal>
    );
}
