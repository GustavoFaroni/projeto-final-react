import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function NavHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"> 
      <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loja legal de anabolizantes
          </Typography>
          
          <Box>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Sobre</Button>
            <Button color="inherit">Contato</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavHeader;