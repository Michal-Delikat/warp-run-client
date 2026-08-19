import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import type { AgentData } from './types';
import Agent from "./Agent.tsx"; 

function Agents() {
    const { token } = useAuth();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['me/agents'],
        queryFn: async () => {
            const meAgentsResponse = await axios.get(`http://localhost:3000/me/agents`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return meAgentsResponse.data;
        },
        enabled: !!token,
    });

    if (isPending) return <p>Player agents loading...</p>;
    if (isError) return <p>Error occured: {error.message}</p>;

    return (
        <>
            <h2>Agents</h2>
            <ul>
                {data.map((agent: AgentData) => {
                    return <li key={agent.id}><Agent agentData={agent}/></li>
                })}
            </ul>
        </>
    );
}

export default Agents;