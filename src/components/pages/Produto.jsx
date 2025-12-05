import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import imagem2 from '../organism/produtoCard.png';

const BRAND_COLOR = '#2e6b36';

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://node-vercel-app-rho.vercel.app/api/produtos/${id}`)
      .then((response) => {
        const d = response.data;
        const produtoObj =
          d && (d.produto || d.data || d) && (d.produto || d.data || d);

        if (!produtoObj || Array.isArray(produtoObj)) {
          const arr = d.produtos || (Array.isArray(d) ? d : null);
          if (Array.isArray(arr)) {
            const found = arr.find((p) => p._id === id || p.id === id);
            setProduto(found || null);
            setSelectedImage(found?.imagens?.[0]?.url || found?.foto || null);
            setLoading(false);
            return;
          }
        }

        const finalProduto =
          produtoObj && !Array.isArray(produtoObj) && (produtoObj._id ? produtoObj : produtoObj.produto || produtoObj);

        setProduto(finalProduto);
        setSelectedImage(finalProduto?.imagens?.[0]?.url || finalProduto?.foto || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setProduto(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        width: '100vw',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        pt: { xs: 8, md: 10 }
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!produto) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        width: '100vw',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        pt: { xs: 8, md: 10 }
      }}>
        <Typography sx={{ color: BRAND_COLOR }}>Nenhum produto encontrado.</Typography>
      </Box>
    );
  }

  const moeda = produto.preco?.moeda || 'BRL';
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: moeda });
  const precoOriginal = produto.preco?.valor ?? null;
  const precoPromocional = produto.preco?.promocional ?? null;
  const precoAntigo = precoPromocional ? (precoOriginal ? formatter.format(precoOriginal) : null) : null;
  const precoFormatado = precoPromocional ? formatter.format(precoPromocional) : (precoOriginal ? formatter.format(precoOriginal) : 'R$ 0,00');

  const imagens = produto.imagens || (produto.fotos ? produto.fotos : []);
  const mainImage = selectedImage || imagens?.[0]?.url || produto.foto || '';

  const avaliacoes = produto.avaliacao || [];
  const ratingValue =
    avaliacoes.length > 0
      ? avaliacoes.reduce((sum, r) => sum + (r.nota || 0), 0) / avaliacoes.length
      : 4.5;

  return (
    <Box sx={{ 
      bgcolor: '#f4f4f4', 
      minHeight: '100vh', 
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      pt: { xs: 8, md: 10 },
      overflow: 'auto',
      color: BRAND_COLOR
    }}>
      <Container maxWidth="lg" sx={{ bgcolor: 'white', borderRadius: 2, p: 4, boxShadow: 1, my: 4 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500, mb: 2, display: { md: 'none' }, color: BRAND_COLOR }}>
          {produto.nome}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 2 }}>
                {(imagens.length ? imagens : [ { url: produto.foto } ]).map((imgObj, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={imgObj?.url || imgObj}
                    onClick={() => setSelectedImage(imgObj?.url || imgObj)}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'contain',
                      border: (mainImage === (imgObj?.url || imgObj)) ? `2px solid ${BRAND_COLOR}` : '1px solid #ddd',
                      borderRadius: 1,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>

              {/* imagem principal */}
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
                  src={imagem2}
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

          <Grid item xs={12} md={5}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 500, mb: 1, display: { xs: 'none', md: 'block' }, color: BRAND_COLOR }}>
              {produto.nome}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={Number(ratingValue.toFixed(1))} precision={0.5} readOnly size="small" />
              <Typography variant="caption" color="text.secondary">({avaliacoes.length} avaliações)</Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Preço */}
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
              sx={{
                bgcolor: BRAND_COLOR,
                height: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                mb: 3,
                '&:hover': { bgcolor: '#235229' },
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

            {/* Frete */}
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

        {/* Descrição */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: BRAND_COLOR }}>Descrição do produto</Typography>
          <Typography variant="body1" sx={{ color: BRAND_COLOR, lineHeight: 1.8 }}>
            {produto.descricao || produto.description || 'Sem descrição.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Produto;