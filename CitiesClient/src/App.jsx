import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Container, Typography } from '@mui/material';
import './App.css'
import CitiesList from './components/citiesList'

function App() {
  return (
<Container maxWidth="md">
      <Box sx={{ textAlign: 'center', margin: '40px 0' }}>
        <Typography variant="h3" color="primary">
          ישובים במדינת ישראל
        </Typography>
      </Box>
      <CitiesList />
    </Container>
  )
}

export default App
