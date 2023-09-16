import { useState, useEffect } from 'react';
import axios from 'axios';

export function useTariffs() {
    const [tariffs, setTariffs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTariffs() {
            try {
                const response = await axios.get('/data/get-tariffs');
                const data = response.data;
                setTariffs(data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных', error);
                setLoading(false);
            }
        }

        fetchTariffs();
    }, []);

    return { tariffs, loading, setTariffs };
}
