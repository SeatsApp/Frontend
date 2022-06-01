import useGet from '../../shared/hooks/useGet';
import { SelectedBuilding } from '../types/SelectedBuilding';

export default function useBuilding() {
    function readSelectedBuildingByDate(buildingId: number, floorId: number, date: string) {
        const { data: selectedBuilding, refetch: refetchSeats } =
            useGet<SelectedBuilding>(`/api/buildings/${buildingId}/floors/${floorId}?date=${date}`,
                {
                    buildingId: 0,
                    buildingName: "",
                    floorId: 0,
                    floorName: "",
                    floorPoints: [],
                    seats: []
                });
        return {
            selectedBuilding,
            refetchSeats,
        };
    }

    return {
        readSelectedBuildingByDate,
    };
}
