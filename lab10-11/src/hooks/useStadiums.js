// src/hooks/useStadiums.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useStadiums(searchStadium, sortStadium, minPrice, maxPrice) {
    const [stadiums, setStadiums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStadiums = async () => {
            setLoading(true);

            try {
                const response = await axios.get('http://localhost:3000/api/stadiums', {
                    params: { searchStadium, sortStadium, minPrice, maxPrice }
                });
                setStadiums(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStadiums();
    }, [searchStadium, sortStadium, minPrice, maxPrice]);

    return { stadiums, loading, error };
}

export default useStadiums;
