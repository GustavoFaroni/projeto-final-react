import imagemPadrao from '../assets/img/frasco.webp';

export { imagemPadrao };

export function imagemDoProduto(produto) {
  return produto?.imagem || imagemPadrao;
}

// Se a foto do produto não existir, troca pela padrão (uma vez só, para não entrar em loop).
export function usarImagemPadraoSeFalhar(evento) {
  const img = evento.currentTarget;
  if (img.dataset.falhou) return;
  img.dataset.falhou = 'true';
  img.src = imagemPadrao;
}
