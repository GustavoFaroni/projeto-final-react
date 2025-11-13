import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavHeader() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color='default'> 
      <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <img src='.\src\components\organism\logo.png' onClick={() => navigate('/')} />
          </Typography>
          
          <Box>
            <Button color="inherit" onClick={() => navigate('/Contato')}>Sobre</Button>
            <Button color="inherit" onClick={() => navigate('/Contato')} >Contato</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavHeader;