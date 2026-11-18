const formatadores = {};

export function formatarPreco(valor, moeda = 'BRL') {
  formatadores[moeda] ??= new Intl.NumberFormat('pt-BR', { style: 'currency', currency: moeda });
  return formatadores[moeda].format(valor ?? 0);
}

export function precoFinal(produto) {
  return produto?.preco?.promocional ?? produto?.preco?.valor ?? 0;
}
