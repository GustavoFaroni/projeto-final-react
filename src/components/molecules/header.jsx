import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// Ícones
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


import logoImg from '../organism/logo.png'; 

function NavHeader() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid #f0f0f0' }}
      >
        <Toolbar>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={logoImg} 
              alt="Natural Supplements, voltar para a página inicial"
              onClick={() => navigate('/')} 
              style={{ height: '80px', cursor: 'pointer' }} 
            />
          </Box>

          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'flex', md: 'flex' }, 
            justifyContent: 'center', 
            gap: 4
          }}>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/Contato')}>Sobre</Button>
            <Button color="inherit" onClick={() => navigate('/Contato')}>Contato</Button>
          </Box>


          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton color="inherit" aria-label="Buscar"><SearchIcon /></IconButton>
            <IconButton color="inherit" aria-label="Minha conta"><PersonOutlineIcon /></IconButton>
            <IconButton color="inherit" aria-label={`Carrinho, ${cartCount} itens`} onClick={() => navigate('/carrinho')}><Badge badgeContent={cartCount} color="error">
        <ShoppingCartOutlinedIcon /></Badge></IconButton>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavHeader;