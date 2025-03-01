import React, { useState } from 'react';
import { TextField, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <Paper
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '25px',
                backgroundColor: 'var(--color-p1)',
                width: '100%',
                maxWidth: 500,
                margin: '20px auto',
                padding: '2px 15px',
                boxShadow: 4,
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                }
            }}
        >
            <TextField
                fullWidth
                variant="standard"
                placeholder="Type to search..."
                value={query}
                onChange={handleChange}
                InputProps={{
                    disableUnderline: true,
                    sx: {
                        padding: '10px 15px',
                        fontSize: '16px',
                        borderRadius: '25px',
                        backgroundColor: 'var(--color-p1)',
                        fontFamily: 'var(--font-p1)'
                    }
                }}
            />
            <IconButton type="submit" sx={{ color: '#333', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.1)' } }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}