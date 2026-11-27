import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { m } from 'motion/react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ProdutoCard from '../molecules/card';
import CardEsqueleto from '../molecules/CardEsqueleto';
import AvisoLeitorDeTela from '../atoms/AvisoLeitorDeTela';
import { useVooCarrinho } from '../../context/VooCarrinhoContext';
import { useProdutos } from '../../hooks/useProdutos';
import { useCart } from '../../context/CartContext';
import { precoFinal } from '../../utils/preco';
import { useTituloPagina } from '../../hooks/useTituloPagina';
import PrateleiraHero from '../molecules/PrateleiraHero';
import { preCarregarPaginas } from '../../rotas';

const SUAVE = [0.22, 1, 0.36, 1];

// A abertura anima só na primeira visita da sessão; ao voltar para a Home, ela já aparece pronta.
let aberturaJaExibida = false;

// Cada linha do título sobe de dentro de uma "janela" (overflow: hidden).
function LinhaTitulo({ children, atraso, animar }) {
  return (
    <Box component="span" sx={{ display: 'block', overflow: 'hidden', pb: '0.08em' }}>
      <m.span
        style={{ display: 'block' }}
        initial={animar ? { y: '105%' } : false}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: SUAVE, delay: atraso }}
      >
        {children}
      </m.span>
    </Box>
  );
}

const aparecer = (atraso, animar) => ({
  initial: animar ? { opacity: 0, y: 12 } : false,
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: SUAVE, delay: atraso },
});

const Home = () => {
  const { produtos, carregando, erro } = useProdutos();
  const { adicionarItem } = useCart();
  const { voarParaCarrinho } = useVooCarrinho();
  const { hash } = useLocation();
  const [aviso, setAviso] = useState('');
  useTituloPagina();
  const [animarAbertura] = useState(() => !aberturaJaExibida);

  useEffect(() => {
    aberturaJaExibida = true;
  }, []);

  // Com a Home pronta, baixa em segundo plano as páginas de Produto e Carrinho.
  useEffect(() => {
    preCarregarPaginas();
  }, []);

  useEffect(() => {
    if (hash && !carregando) {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  }, [hash, carregando]);

  const adicionar = (produto, imagem) => {
    adicionarItem({
      _id: produto._id,
      nome: produto.nome,
      preco: precoFinal(produto),
      fornecedor: produto.fornecedor?.nome,
      imagem: produto.imagem,
    });
    voarParaCarrinho(imagem);
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
          <Typography variant="h1" sx={{ fontSize: 'clamp(36px, 4.2vw, 52px)', lineHeight: 1.12 }}>
            <LinhaTitulo atraso={0.05} animar={animarAbertura}>Bem-estar começa</LinhaTitulo>
            <LinhaTitulo atraso={0.15} animar={animarAbertura}>nos pequenos hábitos.</LinhaTitulo>
          </Typography>
          <m.p {...aparecer(0.35, animarAbertura)} style={{ margin: 0 }}>
            <Typography component="span" sx={{ display: 'block', fontSize: 18, lineHeight: '28px', color: 'text.secondary', maxWidth: '46ch' }}>
              Suplementos naturais escolhidos com cuidado, para acompanhar a sua rotina sem complicação.
            </Typography>
          </m.p>
          <Box component={m.div} {...aparecer(0.45, animarAbertura)} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" size="large" href="#mais-vendidos" sx={{ minHeight: 48, px: 3.5, fontSize: 16 }}>
              Ver produtos
            </Button>
            <Link component={RouterLink} to="/sobre" fontWeight={600} fontSize={16}>
              Conheça a loja
            </Link>
          </Box>
        </Box>

        <Box sx={{ flex: '1 1 320px', minWidth: 0 }}>
          <PrateleiraHero animar={animarAbertura} />
        </Box>
      </Box>

      <Box component="section" id="mais-vendidos" sx={{ maxWidth: 1200, mx: 'auto', px: 2, pb: 8, scrollMarginTop: '88px' }}>
        <Typography variant="h2" sx={{ fontSize: 28, lineHeight: '36px', mb: 3 }}>
          Mais vendidos
        </Typography>

        <AvisoLeitorDeTela>{carregando ? 'Carregando produtos' : aviso}</AvisoLeitorDeTela>

        {erro && <Alert severity="error">Não foi possível carregar os produtos. Tente recarregar a página.</Alert>}

        {!erro && (
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
            {carregando
              ? Array.from({ length: 4 }, (_, i) => <CardEsqueleto key={i} />)
              : produtos.map((produto) => (
                  <ProdutoCard key={produto._id} produto={produto} onAdicionar={adicionar} />
                ))}
          </Box>
        )}
      </Box>

    </>
  );
};

export default Home;
