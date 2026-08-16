import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import type { TradeOptionData } from "./types";

interface TradeControlProps {
    currentPlanetId: string | undefined;
}

function TradeControls({ currentPlanetId }: TradeControlProps) {
    const { token } = useAuth();

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

    return (
        <>
            <h4>Trade options</h4>
            <ul>
                {data?.map((tradeOption: TradeOptionData) => {
                    return (
                        <li key={tradeOption.id}>
                            <p>{tradeOption.resource.name}: {tradeOption.price} $</p>
                            <button>Buy 5</button>
                            <button>Sell 5</button>
                        </li>
                    );

                })}
            </ul>
        </>
    );
}

export default TradeControls;