import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";
import LogOutButton from "./LogOutButton";
import "./PlayerInfo.css";

function PlayerInfo() {
    const { token } = useAuth();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const meResponse = await axios.get('http://localhost:3000/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            return meResponse.data;
        },
        enabled: !!token,
    });

    if (isPending) return <p>Player info loading...</p>;
    if (isError) return <p>Error occured: {error.message}</p>;

    return (
        <div className="player-info-wrapper">
            <p className="player-username">{data.username}</p>
            <p className="player-cash">{data.cash}$</p>
            <LogOutButton></LogOutButton>
        </div>
    );
}

export default PlayerInfo;