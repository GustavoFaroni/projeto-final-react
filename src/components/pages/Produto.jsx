import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Rating,
  Divider,
  Paper,
  CircularProgress
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import produtoImg from '../../assets/img/frasco.webp';
import produtoImg2 from '../../assets/img/frasco-deitado.webp';
import { useCart } from '../../context/CartContext';
import { useProduto } from '../../hooks/useProdutos';
import { formatarPreco, precoFinal } from '../../utils/preco';

const BRAND_COLOR = 'primary.main';

const Produto = () => {
  const { id } = useParams();
  const { produto, carregando } = useProduto(id);
  const { adicionarItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(produtoImg);

  const handleBuy = () => {
    if (!produto) return;
    adicionarItem({
      _id: produto._id,
      nome: produto.nome,
      preco: precoFinal(produto),
      fornecedor: produto.fornecedor?.nome,
    });
  };

  if (carregando) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        width: '100%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        pt: { xs: 3, md: 4 }
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!produto) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        width: '100%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        pt: { xs: 3, md: 4 }
      }}>
        <Typography sx={{ color: BRAND_COLOR }}>Nenhum produto encontrado.</Typography>
      </Box>
    );
  }

  const moeda = produto.preco?.moeda;
  const emPromocao = produto.preco?.promocional != null && produto.preco?.valor != null;
  const precoAntigo = emPromocao ? formatarPreco(produto.preco.valor, moeda) : null;
  const precoFormatado = formatarPreco(precoFinal(produto), moeda);

  const thumbs = [produtoImg, produtoImg2]; 
  const mainImage = selectedImage || produtoImg;

  const avaliacoes = produto.avaliacao || [];
  const ratingValue =
    avaliacoes.length > 0
      ? avaliacoes.reduce((sum, r) => sum + (r.nota || 0), 0) / avaliacoes.length
      : 0;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      pt: { xs: 3, md: 4 },
      overflow: 'auto',
      color: BRAND_COLOR
    }}>
      <Container maxWidth="lg" sx={{ bgcolor: 'white', borderRadius: 2, p: 4, boxShadow: 1, my: 4 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500, mb: 2, display: { md: 'none' }, color: BRAND_COLOR }}>
          {produto.nome}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 2 }}>
                {thumbs.map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`Foto ${idx + 1} de ${produto.nome}`}
                    onClick={() => setSelectedImage(img)}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'contain',
                      border: '2px solid',
                      borderColor: mainImage === img ? BRAND_COLOR : 'divider',
                      borderRadius: 1,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>

              
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '400px',
                  border: '1px solid #eee',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={mainImage}
                  alt={produto.nome}
                  sx={{
                    maxWidth: '400px',
                    maxHeight: '400px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 500, mb: 1, display: { xs: 'none', md: 'block' }, color: BRAND_COLOR }}>
              {produto.nome}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={Number(ratingValue.toFixed(1))} precision={0.5} readOnly size="small" />
              <Typography variant="caption" color="text.secondary">({avaliacoes.length} avaliações)</Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />
 
            <Box sx={{ mb: 3 }}>
              {precoAntigo && (
                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#999' }}>
                  {precoAntigo}
                </Typography>
              )}

              <Typography variant="h3" sx={{ fontWeight: 'bold', color: BRAND_COLOR, letterSpacing: -1 }}>
                {precoFormatado}
              </Typography>

              <Typography variant="body2" sx={{ color: BRAND_COLOR }}>
                no PIX com <strong>5% de desconto</strong>
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: BRAND_COLOR }}>
                <CreditCardIcon fontSize="small" />
                <Typography variant="caption">ou até 12x sem juros no cartão</Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleBuy}
              sx={{
                bgcolor: BRAND_COLOR,
                height: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                mb: 3,
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              Comprar
            </Button>

            <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f9f9f9', border: 'none' }}>
              <Typography variant="body2" sx={{ color: BRAND_COLOR }}>
                Vendido por <strong>{produto.fornecedor?.nome || 'Fornecedor'}</strong>
                <br />
                Entregue por <strong>Natural Supplements</strong>
              </Typography>
            </Paper>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: BRAND_COLOR }}>
                Calcule o frete e prazo de entrega
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField size="small" placeholder="_______-___" sx={{ flexGrow: 1, bgcolor: 'white' }} />
                <Button variant="outlined" sx={{ textTransform: 'none', borderColor: BRAND_COLOR, color: BRAND_COLOR }}>
                  Consultar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: BRAND_COLOR }}>Descrição do produto</Typography>
          <Typography variant="body1" sx={{ color: BRAND_COLOR, lineHeight: 1.8 }}>
            {produto.descricao || 'Sem descrição.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Produto;