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
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 8, pt: { xs: 10, md: 12 }, display: 'flex', justifyContent: 'center' }}>
      
      <Container maxWidth={false} sx={{ width: '100%' }}>
        
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 5, mb: 10 }}
        >
          
          <Grid>
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

          <Grid  sx={{ display: 'flex', justifyContent: 'center'}}>
            <Box 
              component="img"
              src="src/components/organism/home.png"
              sx={{ 
                width: '300px', 
                maxWidth: '1000px', 
                height: 'auto', 
                borderRadius: '20px',
              }}
            />
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1a1a1a' }}>
          Most Popular
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Grid columns={3} container spacing={40} justifyContent="center">
            
            {data?.map((produto) => (
              <Grid key={produto._id}>
                <ActionAreaCard
                  nome={produto.nome}
                  valor={produto.valor}
                  produtoId={produto._id}
                />
              </Grid>
            ))}

          </Grid>
        </Box>

      </Container>
    </Box>
  )
}

export default Home;