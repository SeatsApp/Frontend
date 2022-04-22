import axiosClient from '../../utils/axios-utils';

export default function useSeat() {

  async function createSeat(
    name: string
  ) {
    return axiosClient({url: '/api/seat', method: 'post', 
    data: JSON.stringify({name: name}), headers: {
      'Content-Type': 'application/json'
  }
})
  }

  return {
    createSeat
  };
}
