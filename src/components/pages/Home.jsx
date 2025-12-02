import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Grid, 
  Typography, 
  Container, 
  TextField, 
  Button 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ActionAreaCard from '../molecules/Card';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://node-vercel-app-rho.vercel.app/api/produtos')
      .then((response) => setData(response.data.produtos))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box sx={{ 
      bgcolor: '#fff', 
      minHeight: '100vh', 
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      pt: { xs: 8, md: 10 },
    }}>
      
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        width: '100%'
      }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ maxWidth: 1200, width: '100%' }}
        >
          
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' }}}
            >
              Discover the<br />
              Benefits of Natural <br />
              Supplements
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '400px' }}>
              Find a variety of natural supplements to support your health and wellness.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center'}}>
            <Box 
              component="img"
              src="src/components/organism/home.png"
              alt="Supplements"
              sx={{ 
                width: '100%',
                maxWidth: '400px', 
                height: 'auto', 
                borderRadius: '20px',
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{
        width: '100%',
        px: 2,
        pb: 4,
        overflowY: 'auto',
        flex: 'shrink'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1a1a1a' }}>
          Most Popular
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',               
              sm: 'repeat(2, 1fr)',    
              md: 'repeat(3, 1fr)',    
            },
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {data?.map((produto) => (
            <Box key={produto._id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ActionAreaCard
                nome={produto.nome}
                valor={produto.preco?.valor}
                produtoId={produto._id}
              />
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  )
}

export default Home;