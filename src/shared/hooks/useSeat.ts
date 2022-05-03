import { Seat } from '../../seats/types/Seat';
import axiosClient from '../../utils/AxiosClient';
import useGet from './useGet';

export default function useSeat() {

  async function createSeat(
    name: string
  ) {
    return axiosClient({
      url: '/api/seat', method: 'post',
      data: JSON.stringify({ name: name }), headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async function deleteSeat(seatId:number) {
    return axiosClient({
      url: '/api/seats/' + seatId, method: 'delete',
    })
  }

  async function reserveSeat(seatId:number, startTime:string, endTime:string) {
    return axiosClient({
      url: '/api/seats/' + seatId + '/reserve', method: 'patch',
      data: JSON.stringify({ startTime: startTime, endTime: endTime }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function getSeats() {
    const { data: seats, refetch: refetchSeats } = useGet<Seat[]>(`/api/seats`, []);
    return {
      seats,
      refetchSeats,
    };
  }

  function getSeatsAndReservationsByDate(date: string) {
    const { data: seats, refetch: refetchSeats } = useGet<Seat[]>(`/api/seatsReservationsFromDate?date=` + date, []);
    return {
      seats,
      refetchSeats,
    };
  }

  return {
    createSeat,
    readSeats: getSeats,
    readSeatsByDate: getSeatsAndReservationsByDate,
    deleteSeat,
    reserveSeat
  };
}
