import { useParams } from 'react-router-dom';
const Produto = () =>  {
  const { id } = useParams();
  return <h1>Usuário ID: {id}</h1>;
}
export default Produto;