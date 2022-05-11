import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react'
import {FAB, Portal} from 'react-native-paper';
import {RootStackParamList} from '../../../App';

type homeScreenProp = NavigationProp<RootStackParamList, 'Home'>;

export default function ActionMenu() {
    const navigation = useNavigation<homeScreenProp>();
    const [open, setOpen] = useState(false);

    return (
        <Portal>
            <FAB.Group
                open={open}
                visible={true}
                icon={!open ? 'desk' : 'window-close'}
                actions={[
                    {
                        icon: 'plus',
                        label: 'Create seat',
                        onPress: () => navigation.navigate("CreateSeat"),
                    },
                    {
                        icon: 'calendar-check',
                        label: 'Check in',
                        onPress: () => navigation.navigate("CheckIn"),
                    },
                ]}
                onStateChange={() => setOpen(!open)}
            />
        </Portal>
    );
}
