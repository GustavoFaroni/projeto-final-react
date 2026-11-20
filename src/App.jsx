import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { CartProvider } from './context/CartContext';
import FundoFolhas from './components/atoms/FundoFolhas';
import RolarParaTopo from './components/atoms/RolarParaTopo';
import NavHeader from './components/molecules/header';
import Footer from './components/molecules/Footer';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Sobre from './components/pages/Sobre';
import NaoEncontrada from './components/pages/NaoEncontrada';
import Produto from './components/pages/Produto';
import Carrinho from './components/pages/Carrinho';

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <RolarParaTopo />
      <FundoFolhas />
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavHeader />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/Produto/:id" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  </CartProvider>
);

export default App;
