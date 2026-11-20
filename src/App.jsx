import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { CartProvider } from './context/CartContext';
import FundoFolhas from './components/atoms/FundoFolhas';
import RolarParaTopo from './components/atoms/RolarParaTopo';
import PularParaConteudo from './components/atoms/PularParaConteudo';
import NavHeader from './components/molecules/header';
import Footer from './components/molecules/Footer';
import Home from './components/pages/Home';
import CircularProgress from '@mui/material/CircularProgress';
import { carregarProduto, carregarCarrinho } from './rotas';

// A Home vem no pacote principal; as outras páginas só são baixadas quando a pessoa abre cada uma.
const Produto = lazy(carregarProduto);
const Carrinho = lazy(carregarCarrinho);
const Sobre = lazy(() => import('./components/pages/Sobre'));
const Contato = lazy(() => import('./components/pages/Contato'));
const NaoEncontrada = lazy(() => import('./components/pages/NaoEncontrada'));

const carregandoPagina = (
  <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress aria-label="Carregando página" />
  </Box>
);

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <RolarParaTopo />
      <FundoFolhas />
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <PularParaConteudo />
        <NavHeader />
        <Box component="main" id="conteudo" tabIndex={-1} sx={{ flex: 1, outline: 'none' }}>
          <Suspense fallback={carregandoPagina}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/Produto/:id" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  </CartProvider>
);

export default App;
