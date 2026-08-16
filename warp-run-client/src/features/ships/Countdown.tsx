import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface CountdownProps {
    arrivalAt: string; 
}

function Countdown({ arrivalAt }: CountdownProps) {
    const queryClient = useQueryClient();
    const [remainingMs, setRemainingMs] = useState(() => 
        new Date(arrivalAt).getTime() - Date.now()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = new Date(arrivalAt).getTime() - Date.now();

            if (diff <= 0) {
                setRemainingMs(0);
                clearInterval(interval);
                queryClient.invalidateQueries({ queryKey: ['me/ships'] });
            } else {
                setRemainingMs(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [arrivalAt, queryClient]);

    if (remainingMs <= 0) return <span>Arriving...</span>;

    const totalSeconds = Math.floor(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>;
}

export default Countdown;