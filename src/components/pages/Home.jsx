import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import ActionAreaCard from '../molecules/card';
import { useProdutos } from '../../hooks/useProdutos';
import { formatarPreco, precoFinal } from '../../utils/preco';
import homeImg from '../organism/home.png';

const Home = () => {
  const { produtos, carregando, erro } = useProdutos();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pt: { xs: 8, md: 10 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, py: 4 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ maxWidth: 1200, width: '100%' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h1"
              sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.15 }}
            >
              Discover the<br />
              Benefits of Natural <br />
              Supplements
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
              Find a variety of natural supplements to support your health and wellness.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={homeImg}
              alt="Suplementos naturais"
              sx={{ width: '100%', maxWidth: 400, height: 'auto', borderRadius: '20px' }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ px: 2, pb: 4 }}>
        <Typography variant="h2" sx={{ mb: 4, maxWidth: 1200, mx: 'auto' }}>
          Most Popular
        </Typography>

        {carregando && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress aria-label="Carregando produtos" />
          </Box>
        )}

        {erro && (
          <Alert severity="error" sx={{ maxWidth: 1200, mx: 'auto' }}>
            Não foi possível carregar os produtos. Tente recarregar a página.
          </Alert>
        )}

        {!carregando && !erro && (
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              maxWidth: 1200,
              mx: 'auto',
            }}
          >
            {produtos.map((produto) => (
              <Box key={produto._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ActionAreaCard
                  nome={produto.nome}
                  valor={formatarPreco(precoFinal(produto), produto.preco?.moeda)}
                  produtoId={produto._id}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
