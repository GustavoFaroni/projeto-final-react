import React from 'react';
import { useCart } from '../molecules/Comprar';
import { Box, Container, Typography, Button, Paper, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import produtoImg from '../organism/produtoCard.png';

const BRAND_COLOR = '#2e6b36';

const Carrinho = () => {
  const { cartItems, attQuantidade, removerItem } = useCart();
  const navigate = useNavigate();

  
  const total = cartItems.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Box sx={{ 
      bgcolor: '#f4f4f4', 
      minHeight: '100vh', 
      width: '100vw',
      pt: { xs: 8, md: 10 }, 
      pb: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <Box sx={{ width: '100%', maxWidth: 1200, px: 2 }}>
        <Typography variant="h4" sx={{ mb: 4, color: BRAND_COLOR, fontWeight: 'bold' }}>
          Seu Carrinho
        </Typography>

        {cartItems.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Seu carrinho está vazio.</Typography>
            <Button variant="outlined" sx={{ mt: 2, color: BRAND_COLOR, borderColor: BRAND_COLOR }} onClick={() => navigate('/')}>
              Voltar para a Loja
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            
            <Box sx={{ flex: 2 }}>
              {cartItems.map((item) => (
                <Paper key={item._id} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      
                  <Box 
                    component="img" 
                    src={produtoImg} 
                    alt={item.nome}
                    sx={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 1, border: '1px solid #eee' }}
                  />
                  

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{item.nome}</Typography>
                    <Typography variant="body2" color="text.secondary">{formatter.format(item.preco)}</Typography>
                  </Box>


                  <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
                    <IconButton size="small" onClick={() => attQuantidade(item._id, -1)}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ px: 1, minWidth: 30, textAlign: 'center' }}>
                      {item.quantidade}
                    </Typography>
                    <IconButton size="small" onClick={() => attQuantidade(item._id, 1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <IconButton color="error" onClick={() => removerItem(item._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Paper>
              ))}
            </Box>

            
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ p: 3, position: 'sticky', top: 120 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Resumo do Pedido</Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>{formatter.format(total)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Frete</Typography>
                  <Typography color="success.main">Grátis</Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color={BRAND_COLOR}>{formatter.format(total)}</Typography>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ bgcolor: BRAND_COLOR, '&:hover': { bgcolor: '#235229' } }}
                  onClick={() => alert("Simulação: Compra finalizada!")}
                >
                  Finalizar Compra
                </Button>
              </Paper>
            </Box>

          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Carrinho;