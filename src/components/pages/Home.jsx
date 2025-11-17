import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActionAreaCard from '../molecules/Card';

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
            <Grid key={funcionario.id ?? index}>
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
    </div>
  )
}

export default Home;
  