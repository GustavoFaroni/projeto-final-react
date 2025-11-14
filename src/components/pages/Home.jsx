import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActionAreaCard from '../molecules/card';

const Home = () => {
  const [data, setData] = useState([]);
    useEffect(() => {
    axios.get('https://node-vercel-app-rho.vercel.app/api/funcionarios')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className={'home'}>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={2} >
          {data?.map((funcionario, index) => (
            <Grid item xs={12} sm={6} md={4} key={funcionario.id ?? index}>
              <ActionAreaCard
                imagem={funcionario.foto}
                nome={funcionario.nome}
                sobrenome={funcionario.sobrenome}
                dtnascimento={funcionario.dtNascimento}
                cargo={funcionario.cargo}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default Home;
  