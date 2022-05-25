import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';

export default function usePushNotifications() {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    async function scheduleReservationNotification(time: number, title: string, reservationId: number) {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
            },
            trigger: {
                seconds: time,
                channelId: 'default',
            },
        });

        await SecureStore.setItemAsync("Reservation-" + reservationId, identifier)
    }

    async function cancelReservationNotification(reservationId: number) {
        const identifier = await SecureStore.getItemAsync("Reservation-" + reservationId)

        if (identifier !== null) {
            await Notifications.cancelScheduledNotificationAsync(identifier);
        }
    }

    return {
        scheduleReservationNotification,
        cancelReservationNotification
    }
}