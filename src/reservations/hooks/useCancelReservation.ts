import AxiosClient from "../../utils/AxiosClient";

export default function useCancelReservation(reservationId: number) {
    return AxiosClient({
        url: '/api/reservations/' + reservationId + '/cancel', method: 'patch'
    })
}