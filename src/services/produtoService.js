import api from './api';

export async function listarProdutos() {
  const { data } = await api.get('/produtos');
  return data.produtos;
}

export async function buscarProduto(id) {
  const { data } = await api.get(`/produtos/${id}`);
  return data.produto;
}
