import React from 'react';
import { TariffCard } from './components/Card/Card';
import { Container, Grid } from '@mui/material';
import { sortTariffsByPrice } from './utils/sortedFunction';
import { useTariffs } from './hooks/useTariffs';
import { SelectForm } from './components/SelectForm/SelectForm';
import ButtonRefresh from './components/ButtonRefresh/ButtonRefresh';

function App() {
    const [sortByPrice, setSortByPrice] = React.useState('ascending');
    const { tariffs, loading, setTariffs } = useTariffs();

    const handleSortChange = (event) => {
        setSortByPrice(event.target.value);
    };

    if (loading) {
        return <p>Идет загрузка...</p>;
    }

    if (!tariffs || tariffs.length === 0) {
        return <p>Данные не загружены.</p>;
    }

    const sortedTariffs = sortTariffsByPrice(tariffs, sortByPrice);

    const handleSetTariffs = (newTariffs) => {
        setTariffs(newTariffs);
    };

    return (
        <div className='App'>
            <Container>
                <SelectForm
                    handleSortChange={handleSortChange}
                    sortByPrice={sortByPrice}
                />
                <ButtonRefresh setTariffs={handleSetTariffs} />
                <Grid
                    container
                    spacing={2}
                >
                    {sortedTariffs.map((tariff, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={index}
                        >
                            <TariffCard tariff={tariff} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
