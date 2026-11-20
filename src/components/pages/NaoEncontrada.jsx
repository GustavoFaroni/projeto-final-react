import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTituloPagina } from '../../hooks/useTituloPagina';

const NaoEncontrada = () => {
  useTituloPagina('Página não encontrada');

  return (
  <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 2, px: 2 }}>
    <Typography variant="h1" sx={{ fontSize: 36 }}>Página não encontrada</Typography>
    <Typography color="text.secondary">O endereço pode ter mudado ou estar digitado errado.</Typography>
    <Button variant="contained" size="large" component={RouterLink} to="/" sx={{ minHeight: 48, px: 3.5 }}>
      Voltar para a loja
    </Button>
  </Box>
  );
};

export default NaoEncontrada;
