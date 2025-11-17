import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Produto = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    axios.get(`https://node-vercel-app-rho.vercel.app/api/funcionarios/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);
  
  return (
    <div>
      <h1>Produto Detalhes</h1>
      {data && (
        <>
          <p>Nome: {data.nome} {data.sobrenome}</p>
          <p>Data de Nascimento: {data.dtNascimento}</p>
          <p>Cargo: {data.cargo}</p>
          <img src={data.foto} alt={data.nome} />
        </>
      )}
    </div>
  );
};

export default Produto;