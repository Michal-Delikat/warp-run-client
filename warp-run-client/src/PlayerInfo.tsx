import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./context/AuthContext";
import "./PlayerInfo.css";

function PlayerInfo() {
    const { token } = useAuth();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const meResponse = await axios.get('http://localhost:3000/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            return meResponse.data;
        }
    });

    if (isLoading) return <p>Player info loading...</p>;
    if (isError) return <p>Error occured: {error.message}</p>;

    return (
        <div className="player-info-wrapper">
            <span className="player-username">{data.username}</span>
            <span className="player-cash">{data.cash}</span>
        </div>
    );
}

export default PlayerInfo;