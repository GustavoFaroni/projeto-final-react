import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import NavHeader from './components/molecules/header';
import Contato from './components/pages/Contato';
import Produto from './components/pages/Produto';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavHeader /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Produto/:id" element={<Produto />} />
      </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
          