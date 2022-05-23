import { toast } from '@jamsch/react-native-toastify';
import { Seat } from '../../seats/types/Seat';
import axiosClient from '../../utils/AxiosClient';
import useGet from './useGet';

export default function useSeat() {

  async function createSeat(
    name: string
  ) {
    return axiosClient({
      url: '/api/seats', method: 'post',
      data: JSON.stringify({ name: name }), headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      toast.success("Seat with name \"" + name
        + "\" is successfully created.")
    })
      .catch(() => {
        /* istanbul ignore next */
        toast.error("Could not create a seat with name \"" + name + "\".")
      })
  }

  async function deleteSeat(seatId: number) {
    return axiosClient({
      url: '/api/seats/' + seatId, method: 'delete',
    }).then(() => {
      toast.success("Successfully deleted the seat.")
    }).catch(() => {
      /* istanbul ignore next */
      toast.error("Could not delete the seat.")
    })
  }

  async function reserveSeat(seatId: number, startTime: string, endTime: string) {
    return axiosClient({
      url: '/api/seats/' + seatId + '/reserve', method: 'patch',
      data: JSON.stringify({ startDateTime: startTime, endDateTime: endTime }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      toast.success("Successfully reserved the seat between " + startTime + " and " + endTime + ".")
    }).catch(() => {
      /* istanbul ignore next */
      toast.error("Reserving the seat failed.")
    })
  }

  function readSeats() {
    const { data: seats, refetch: refetchSeats } = useGet<Seat[]>(`/api/seats`, []);
    return {
      seats,
      refetchSeats,
    };
  }

  function readSeatsByDate(date: string) {
    const { data: seats, refetch: refetchSeats } = useGet<Seat[]>(`/api/seats/reservations/date/` + date, []);
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
    createSeat,
    readSeats,
    readSeatsByDate,
    deleteSeat,
    reserveSeat,
    checkInSeat
  };
}
