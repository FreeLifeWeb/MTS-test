import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export function SelectForm({ sortByPrice, handleSortChange }) {
    return (
        <FormControl style={{ margin: '20px' }}>
            <InputLabel>Сортировка по цене</InputLabel>
            <Select
                value={sortByPrice}
                onChange={handleSortChange}
            >
                <MenuItem value='ascending'>По возрастанию цены</MenuItem>
                <MenuItem value='descending'>По убыванию цены</MenuItem>
            </Select>
        </FormControl>
    );
}
