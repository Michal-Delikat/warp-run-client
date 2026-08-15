import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import type { ShipData } from './types/ship';
import Ship from "./Ship"; 
import "./Ships.css";

function Ships() {
    const { token } = useAuth();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['me/ships'],
        queryFn: async () => {
            const meShipsResponse = await axios.get('http://localhost:3000/me/ships', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return meShipsResponse.data;
        },
        enabled: !!token,
    });

    if (isPending) return <p>Player ships loading...</p>;
    if (isError) return <p>Error occured: {error.message}</p>;

    return (
        <>
            <h2>Ships</h2>
            <ul>
                {data.map((ship: ShipData) => {
                    return <li key={ship.id}><Ship shipData={ship}></Ship></li>
                })}
            </ul>
        </>
    );
}

export default Ships;