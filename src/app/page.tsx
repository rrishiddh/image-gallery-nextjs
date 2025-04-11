'use client';

import { useState } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import UploadButton from './components/UploadButton';
import ImageGrid from './components/ImageGrid';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const theme = useTheme();

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Paper elevation={3} sx={{ p: 3,         overflow: 'auto'
    }}>
 <Box sx={{
        display: 'block',
        mb: 3,
        justifyContent: 'space-between', 
        alignItems: 'center',  
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        },
      }}
    >        <Typography variant="h5" component="h1">
          NextGen Image Gallery
        </Typography>
        <UploadButton onUploadSuccess={handleUploadSuccess} />
      </Box>
      
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      <ImageGrid 
        searchQuery={searchQuery} 
        key={refreshTrigger}
      />
    </Paper>
  );
}