import useGet from '../../shared/hooks/useGet';
import { Building } from '../types/Building';
import { SelectedBuilding } from '../types/SelectedBuilding';

export default function useBuilding() {
    function readSelectedBuildingByDate(buildingId: number, floorId: number, date: string) {
        const { data: selectedBuilding, refetchFilter: refetchFilterBuilding, loading } =
            useGet<SelectedBuilding>(`/api/buildings/${buildingId}/floors/${floorId}?date=${date}`,
                {
                    buildingId: 0,
                    buildingName: "",
                    floorId: 0,
                    floorName: "",
                    floorPoints: [],
                    seats: []
                });

        const refetchBuilding = async (refetchBuildingId: number, refetchFloorId: number, refetchDate: string) => {
            await refetchFilterBuilding(`/api/buildings/${refetchBuildingId}/floors/${refetchFloorId}?date=${refetchDate}`)
        }

        return {
            selectedBuilding,
            refetchBuilding,
            loading
        };
    }

    function readAllBuildings(retrieveImmediately = true) {
        const { data: allBuildings, loading, refetch } = useGet<Building[]>(`/api/buildings`, [], retrieveImmediately);

        return {
            allBuildings,
            loading,
            refetch
        };
    }

    return {
        readSelectedBuildingByDate,
        readAllBuildings
    };
}
