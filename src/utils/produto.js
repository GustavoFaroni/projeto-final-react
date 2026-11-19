export function temPromocao(produto) {
  const { valor, promocional } = produto?.preco ?? {};
  return promocional != null && valor != null && promocional < valor;
}

export function percentualDesconto(produto) {
  if (!temPromocao(produto)) return 0;
  return Math.round((1 - produto.preco.promocional / produto.preco.valor) * 100);
}

export function resumoAvaliacoes(produto) {
  const notas = (produto?.avaliacao ?? []).map((a) => a.nota).filter((n) => typeof n === 'number');
  if (notas.length === 0) return { media: 0, total: 0, texto: 'Sem avaliações ainda' };

  const media = notas.reduce((soma, n) => soma + n, 0) / notas.length;
  const mediaTexto = media.toFixed(1).replace('.', ',');
  const rotulo = notas.length === 1 ? 'avaliação' : 'avaliações';
  return { media, total: notas.length, texto: `★ ${mediaTexto} (${notas.length} ${rotulo})` };
}
