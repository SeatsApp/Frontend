import AxiosClient from '../../utils/AxiosClient';

export default function useSeat() {

  async function createSeat(
    name: string
  ) {
    return AxiosClient({url: '/api/seat', method: 'post', 
    data: JSON.stringify({name: name}), headers: {
      'Content-Type': 'application/json'
  }
})
  }

  return {
    createSeat
  };
}
