import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavHeader from './components/molecules/header';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Produto from './components/pages/Produto';
import Carrinho from './components/pages/Carrinho';

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Produto/:id" element={<Produto />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);

export default App;
