import useGet from "../../shared/hooks/useGet"
import { UserReservation } from "../type/UserReservation"

  export default function useGetMyReservations() {
    const { data: userReservations, refetch: refetchSeats, loading } = useGet<UserReservation[]>("/api/reservations/users", [])
    return {
      userReservations,
      refetchSeats,
      loading
    }
  }