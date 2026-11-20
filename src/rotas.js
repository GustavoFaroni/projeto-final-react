// Funções que baixam o código das páginas mais visitadas depois da Home.
// Ficam separadas para a Home poder pré-carregar essas páginas quando o navegador estiver livre.
export const carregarProduto = () => import('./components/pages/Produto');
export const carregarCarrinho = () => import('./components/pages/Carrinho');

export function preCarregarPaginas() {
  const carregar = () => {
    carregarProduto();
    carregarCarrinho();
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(carregar);
  else setTimeout(carregar, 1500);
}
