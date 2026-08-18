import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

interface JumpButtonProps {
    shipId: string;
}

function JumpButton({ shipId }: JumpButtonProps) {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const jumpMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                `http://localhost:3000/ships/${shipId}/jump`,
                {},
                { headers: { Authorization: `Bearer ${token}` }},
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me/ships']});
        },
    })

    return <button onClick={() => jumpMutation.mutate()} disabled={jumpMutation.isPending}>Jump</button>
}

export default JumpButton;