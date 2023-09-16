import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const styles = {
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: '20px',
        backgroundColor: 'grey',
        color: 'white',
    },
};
export default function ButtonRefresh({ setTariffs }) {
    const handleRefresh = async () => {
        try {
            const response = await axios.get('/data/update-and-get-tariffs');
            const data = response.data;
            console.log(data);
            setTariffs(data);
        } catch (error) {
            console.error('Ошибка при обновлении данных', error);
        }
    };

    return (
        <Button
            style={styles.button}
            onClick={handleRefresh}
        >
            Парсить
        </Button>
    );
}
