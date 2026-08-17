import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import type { TradeOptionData } from "./types";

interface TradeControlProps {
    shipId: string;
    currentPlanetId: string | undefined;
}

function TradeControls({ currentPlanetId, shipId }: TradeControlProps) {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['planet-market', currentPlanetId],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:3000/planets/${currentPlanetId}/market`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            return response.data;
        },
        enabled: !!token && !!currentPlanetId,
    });

    const buyMutation = useMutation({
        mutationFn: async ({resourceId, quantity}: { resourceId: string; quantity: number }) => {
            const response = await axios.post(
                `http://localhost:3000/planets/${currentPlanetId}/market/buy`,
                { resourceId, quantity, shipId },
                { headers: { Authorization: `Bearer ${token}` }},
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me/ships']});
            queryClient.invalidateQueries({ queryKey: ['me']});
        },
    });

    const sellMutation = useMutation({
        mutationFn: async ({resourceId, quantity}: { resourceId: string, quantity: number }) => {
            const response = await axios.post(
                `http://localhost:3000/planets/${currentPlanetId}/market/sell`,
                { resourceId, quantity, shipId },
                { headers: { Authorization: `Bearer ${token}` }},
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me/ships']});
            queryClient.invalidateQueries({ queryKey: ['me']});
        },
    });

    return (
        <>
            <h4>Trade options</h4>
            <ul>
                {data?.map((tradeOption: TradeOptionData) => {
                    return (
                        <li key={tradeOption.id}>
                            <p>{tradeOption.resource.name}: {tradeOption.price} $</p>
                            <button onClick={() => buyMutation.mutate({ resourceId: tradeOption.resource.id, quantity: 5})}>Buy 5</button>
                            <button onClick={() => sellMutation.mutate({ resourceId: tradeOption.resource.id, quantity: 5})}>Sell 5</button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default TradeControls;