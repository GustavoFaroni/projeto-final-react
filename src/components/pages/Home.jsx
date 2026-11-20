import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Link, Snackbar, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProdutoCard from '../molecules/card';
import { useProdutos } from '../../hooks/useProdutos';
import { useCart } from '../../context/CartContext';
import { precoFinal } from '../../utils/preco';
import heroImg from '../../assets/img/hero.webp';

const Home = () => {
  const { produtos, carregando, erro } = useProdutos();
  const { adicionarItem } = useCart();
  const { hash } = useLocation();
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    if (hash && !carregando) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash, carregando]);

  const adicionar = (produto) => {
    adicionarItem({
      _id: produto._id,
      nome: produto.nome,
      preco: precoFinal(produto),
      fornecedor: produto.fornecedor?.nome,
      imagem: produto.imagem,
    });
    setAviso(`${produto.nome} foi adicionado ao carrinho`);
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: 2,
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 8 },
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <Box sx={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: 'clamp(36px, 4.2vw, 52px)', lineHeight: 1.12, textWrap: 'balance' }}
          >
            Bem-estar começa nos pequenos hábitos.
          </Typography>
          <Typography sx={{ fontSize: 18, lineHeight: '28px', color: 'text.secondary', maxWidth: '46ch' }}>
            Suplementos naturais escolhidos com cuidado, para acompanhar a sua rotina sem complicação.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" size="large" href="#mais-vendidos" sx={{ minHeight: 48, px: 3.5, fontSize: 16 }}>
              Ver produtos
            </Button>
            <Link component={RouterLink} to="/Contato" fontWeight={600} fontSize={16}>
              Conheça a loja
            </Link>
          </Box>
        </Box>

        <Box
          sx={{ flex: '1 1 320px', minWidth: 0, aspectRatio: '5 / 4', borderRadius: '16px', overflow: 'hidden', bgcolor: 'sage' }}
        >
          <Box
            component="img"
            src={heroImg}
            alt="Frasco de vitamina C deitado com cápsulas verdes espalhadas"
            width={1000}
            height={800}
            fetchPriority="high"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      </Box>

      <Box component="section" id="mais-vendidos" sx={{ maxWidth: 1200, mx: 'auto', px: 2, pb: 8, scrollMarginTop: '88px' }}>
        <Typography variant="h2" sx={{ fontSize: 28, lineHeight: '36px', mb: 3 }}>
          Mais vendidos
        </Typography>

        {carregando && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress aria-label="Carregando produtos" />
          </Box>
        )}

        {erro && <Alert severity="error">Não foi possível carregar os produtos. Tente recarregar a página.</Alert>}

        {!carregando && !erro && (
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 2, sm: 3 },
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
            }}
          >
            {produtos.map((produto) => (
              <ProdutoCard key={produto._id} produto={produto} onAdicionar={adicionar} />
            ))}
          </Box>
        )}
      </Box>

      <Snackbar
        open={Boolean(aviso)}
        autoHideDuration={3000}
        onClose={() => setAviso('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert icon={<CheckCircleOutlineIcon />} severity="success" variant="filled" onClose={() => setAviso('')}>
          {aviso}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
