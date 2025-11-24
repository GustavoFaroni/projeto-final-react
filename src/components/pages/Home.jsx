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
    axios.get('https://node-vercel-app-rho.vercel.app/api/funcionarios')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 8, pt: { xs: 10, md: 12 }, display: 'flex', justifyContent: 'center' }}>
      
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mt: 5, mb: 10 }}>
          
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

          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box 
              component="img"
              src="https://th.bing.com/th/id/OIP.tAa1nO5gLIVCPbcxNXjZQwHaE7?w=263&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
              alt="Equipe reunida"
              sx={{ 
                width: '100%', 
                maxWidth: '500px', 
                height: 'auto', 
                borderRadius: '20px', 
                boxShadow: '20px 20px 0px #e8f5e9' 
              }}
            />
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1a1a1a' }}>
          Most Popular
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={4} justifyContent="center">
            
            {data?.map((funcionario, index) => (
              <Grid item xs={12} sm={6} md={4} key={funcionario.id ?? index}>
                <ActionAreaCard
                  imagem={funcionario.foto}
                  nome={funcionario.nome}
                  sobrenome={funcionario.sobrenome}
                  dtnascimento={funcionario.dtNascimento}
                  cargo={funcionario.cargo}
                  produtoId={funcionario._id}
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