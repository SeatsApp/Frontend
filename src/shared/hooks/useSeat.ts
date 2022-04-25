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

  function getSeats() {
    const { data: seats, refetch: refetchSeats } = useGet<Seat[]>(`/api/seats`, []);
    return {
      seats,
      refetchSeats,
    };
  }

  return {
    createSeat,
    readSeats: getSeats,
    deleteSeat
  };
}
