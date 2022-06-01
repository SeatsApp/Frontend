import { toast } from '@jamsch/react-native-toastify';
import { Seat } from '../../seats/types/Seat';
import axiosClient from '../../utils/AxiosClient';
import useGet from './useGet';

export default function useSeat() {
  async function reserveSeat(seatId: number, startTime: string, endTime: string) {

    return axiosClient({
      url: '/api/seats/' + seatId + '/reserve', method: 'patch',
      data: JSON.stringify({ startDateTime: startTime, endDateTime: endTime }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response: unknown) => {
      toast.success("Successfully reserved the seat between " + startTime + " and " + endTime + ".")
      return response
    }).catch((error: unknown) => {
      /* istanbul ignore next */
      toast.error("Reserving the seat failed.")
      return error
    })
  }

  function readSeats() {
    const { data: seats, refetch: refetchSeats } = useGet<Seat[]>(`/api/seats`, []);
    return {
      seats,
      refetchSeats,
    };
  }

  async function checkInSeat(seatId: number) {
    return axiosClient({
      url: '/api/seats/' + seatId + '/checkIn', method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => toast.success("Successfully checked in."))
      .catch(() => toast.error("Could not check in on this seat."))
  }

  return {
    readSeats,
    reserveSeat,
    checkInSeat
  };
}
