import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import type { ShipData } from "./types/ship";
import Countdown from './components/Countdown';

interface ShipProps {
    shipData: ShipData
}

const PLANET_A_ID = "20da46da-f631-4397-9de3-d647d81ee4a4";
const PLANET_B_ID = "0ca425d7-ab4d-494b-8835-558c08cff52a";

function Ship({ shipData } : ShipProps) {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const travelMutation = useMutation({
        mutationFn: async (destinationPlanetId: string) => {
            const response = await axios.post(
                `http://localhost:3000/ships/${shipData.id}/travel`,
                { destinationPlanetId },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me/ships'] });
        },
    });

    const isInTransit = shipData.destinationPlanet !== null;

    return (
        <div className="ship-wrapper">
            <h3>{shipData.name}</h3>
            <p>{shipData.currentPlanet?.name ?? "Null"} - {shipData.destinationPlanet?.name ?? "Null"}</p>
            {shipData.arrivalAt && <p>Arrival in: <Countdown arrivalAt={shipData.arrivalAt} /></p>}
            {!isInTransit && (
                <>
                    <button onClick={() => travelMutation.mutate(PLANET_A_ID)} disabled={travelMutation.isPending}>
                        {travelMutation.isPending ? "..." : "Travel to planet A"}
                    </button>
                    <button onClick={() => travelMutation.mutate(PLANET_B_ID)} disabled={travelMutation.isPending}>
                        {travelMutation.isPending ? "..." : "Travel to planet B"}
                    </button>
                </>
            )}
            {travelMutation.isError && <p>Error: {travelMutation.error.message}</p>}
        </div>
    );
}

export default Ship;