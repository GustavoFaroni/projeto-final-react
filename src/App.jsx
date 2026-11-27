import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, MotionConfig, m } from 'motion/react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { CartProvider } from './context/CartContext';
import { VooCarrinhoProvider } from './context/VooCarrinhoContext';
import FundoFolhas from './components/atoms/FundoFolhas';
import RolarParaTopo from './components/atoms/RolarParaTopo';
import PularParaConteudo from './components/atoms/PularParaConteudo';
import NavHeader from './components/molecules/header';
import Footer from './components/molecules/Footer';
import Home from './components/pages/Home';
import { carregarProduto, carregarCarrinho } from './rotas';

// A Home vem no pacote principal; as outras páginas só são baixadas quando a pessoa abre cada uma.
const Produto = lazy(carregarProduto);
const Carrinho = lazy(carregarCarrinho);
const Sobre = lazy(() => import('./components/pages/Sobre'));
const Contato = lazy(() => import('./components/pages/Contato'));
const NaoEncontrada = lazy(() => import('./components/pages/NaoEncontrada'));

const carregarAnimacoes = () => import('./animacoes').then((modulo) => modulo.default);

const carregandoPagina = (
  <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress aria-label="Carregando página" />
  </Box>
);

// Troca de página com um fade curto: a página antiga sai antes de a nova entrar.
function Rotas() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <Suspense fallback={carregandoPagina}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/Produto/:id" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </Suspense>
      </m.div>
    </AnimatePresence>
  );
}

const App = () => (
  // reducedMotion="user": quem pediu "reduzir movimento" no sistema não vê deslocamentos, só fades
  <MotionConfig reducedMotion="user">
    {/* LazyMotion + componentes "m": o código das animações vem num arquivo separado, sem pesar o carregamento inicial */}
    <LazyMotion features={carregarAnimacoes} strict>
    <CartProvider>
      <VooCarrinhoProvider>
        <BrowserRouter>
          <RolarParaTopo />
          <FundoFolhas />
          <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <PularParaConteudo />
            <NavHeader />
            <Box component="main" id="conteudo" tabIndex={-1} sx={{ flex: 1, outline: 'none' }}>
              <Rotas />
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </VooCarrinhoProvider>
    </CartProvider>
    </LazyMotion>
  </MotionConfig>
);

export default App;
