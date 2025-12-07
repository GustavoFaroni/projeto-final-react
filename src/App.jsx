import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import NavHeader from './components/molecules/header';
import Contato from './components/pages/Contato';
import Produto from './components/pages/Produto';
import { CartProvider } from './components/molecules/Comprar';
import Carrinho from './components/pages/Carrinho';


const App = () => {
  return (
    <>
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
    </>
   
  );
}

export default App;
          