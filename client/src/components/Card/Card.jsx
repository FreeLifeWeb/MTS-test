import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component='span'
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export function TariffCard({ tariff }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 333,
                minHeight: 350,
            }}
        >
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography
                    sx={{ fontSize: 14 }}
                    color='text.secondary'
                    gutterBottom
                >
                    {bull}
                    {tariff.title}
                </Typography>
                <Typography
                    variant='h5'
                    component='div'
                >
                    {bull}
                    {tariff.description}
                </Typography>
                <Typography
                    sx={{ mb: 1.5 }}
                    color='text.secondary'
                >
                    {bull}
                    {tariff.price}
                </Typography>
                <Typography variant='body2'>
                    {bull}
                    {tariff.benefitsDescription}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button size='small'>More</Button>
            </Box>
        </Card>
    );
}
