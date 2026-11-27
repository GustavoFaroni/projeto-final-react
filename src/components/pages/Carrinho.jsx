import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useCart } from '../../context/CartContext';
import { formatarPreco } from '../../utils/preco';
import SeletorQuantidade from '../atoms/SeletorQuantidade';
import { useTituloPagina } from '../../hooks/useTituloPagina';
import { imagemDoProduto, usarImagemPadraoSeFalhar } from '../../utils/imagem';

const MotionLi = m.create('li');

const cartao = { bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: '16px' };

function Aviso({ icone, titulo, texto }) {
  return (
    <Box sx={{ ...cartao, py: 6, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textAlign: 'center' }}>
      {icone}
      <Typography sx={{ fontSize: 18, lineHeight: '28px', fontWeight: 600 }}>{titulo}</Typography>
      {texto && <Typography color="text.secondary" sx={{ maxWidth: '48ch' }}>{texto}</Typography>}
      <Button variant="contained" size="large" component={RouterLink} to="/" sx={{ minHeight: 48, px: 3.5 }}>
        Ver produtos
      </Button>
    </Box>
  );
}

function LinhaResumo({ rotulo, valor, destaque }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Typography sx={destaque ? { fontSize: 18, fontWeight: 600 } : undefined}>{rotulo}</Typography>
      {valor}
    </Box>
  );
}

const Carrinho = () => {
  const { cartItems, attQuantidade, removerItem, restaurarItem, limparCarrinho, cartCount, cartTotal } = useCart();
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const [removido, setRemovido] = useState(null);
  useTituloPagina('Carrinho');

  const remover = (item) => {
    setRemovido({ item, posicao: cartItems.indexOf(item) });
    removerItem(item._id);
  };

  const desfazer = () => {
    if (removido) restaurarItem(removido.item, removido.posicao);
    setRemovido(null);
  };

  const finalizar = () => {
    limparCarrinho();
    setPedidoFinalizado(true);
  };

  const iconeGrande = { fontSize: 56, color: 'primary.main' };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, pt: 4, pb: 8 }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 30, md: 36 }, lineHeight: 1.2, mb: 3 }}>
        Seu carrinho
      </Typography>

      {pedidoFinalizado ? (
        <Aviso
          icone={<CheckCircleOutlineIcon sx={iconeGrande} />}
          titulo="Pedido recebido!"
          texto="Esta é uma loja de demonstração, então nenhum pagamento foi feito. Obrigado por testar."
        />
      ) : cartItems.length === 0 ? (
        <Aviso icone={<ShoppingCartOutlinedIcon sx={iconeGrande} />} titulo="Seu carrinho está vazio." />
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'flex-start' }}>
          <Box component="ul" sx={{ flex: '999 1 560px', minWidth: 0, listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AnimatePresence initial={false}>
            {cartItems.map((item) => (
              // layout: quando um item sai, os de baixo sobem deslizando em vez de pular
              <MotionLi
                key={item._id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                style={{ listStyle: 'none' }}
              >
              <Box
                sx={{ ...cartao, p: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}
              >
                <Box
                  component="img"
                  src={imagemDoProduto(item)}
                  onError={usarImagemPadraoSeFalhar}
                  alt=""
                  loading="lazy"
                  width={88}
                  height={88}
                  sx={{ width: 88, height: 88, flex: '0 0 88px', borderRadius: '10px', objectFit: 'cover', bgcolor: 'sage' }}
                />
                <Box sx={{ flex: '1 1 180px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Link
                    component={RouterLink}
                    to={`/Produto/${item._id}`}
                    underline="hover"
                    sx={{ color: 'text.primary', fontSize: 16, lineHeight: '22px', fontWeight: 600 }}
                  >
                    {item.nome}
                  </Link>
                  <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {formatarPreco(item.preco)} cada
                  </Typography>
                </Box>
                <SeletorQuantidade
                  rotulo={`Quantidade de ${item.nome}`}
                  valor={item.quantidade}
                  onDiminuir={() => attQuantidade(item._id, -1)}
                  onAumentar={() => attQuantidade(item._id, 1)}
                />
                <Typography sx={{ minWidth: 96, textAlign: 'right', fontSize: 18, lineHeight: '26px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {formatarPreco(item.preco * item.quantidade)}
                </Typography>
                <IconButton
                  aria-label={`Remover ${item.nome} do carrinho`}
                  onClick={() => remover(item)}
                  sx={{ width: 44, height: 44, color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
              </MotionLi>
            ))}
            </AnimatePresence>
          </Box>

          <Box
            component="aside"
            aria-label="Resumo do pedido"
            sx={{ ...cartao, flex: '1 1 300px', minWidth: 0, p: 3, display: 'flex', flexDirection: 'column', gap: 2, position: { md: 'sticky' }, top: { md: 96 }, fontVariantNumeric: 'tabular-nums' }}
          >
            <Typography variant="h2" sx={{ fontSize: 22, lineHeight: '30px', fontWeight: 600 }}>
              Resumo do pedido
            </Typography>
            <LinhaResumo
              rotulo={`Subtotal (${cartCount} ${cartCount === 1 ? 'item' : 'itens'})`}
              valor={<Typography>{formatarPreco(cartTotal)}</Typography>}
            />
            <LinhaResumo rotulo="Frete" valor={<Typography sx={{ color: 'primary.main', fontWeight: 600 }}>Grátis</Typography>} />
            <Divider />
            <LinhaResumo
              destaque
              rotulo="Total"
              valor={<Typography sx={{ fontSize: 24, lineHeight: '32px', fontWeight: 600, color: 'primary.main' }}>{formatarPreco(cartTotal)}</Typography>}
            />
            <Button variant="contained" size="large" onClick={finalizar} sx={{ minHeight: 48, fontSize: 16 }}>
              Finalizar compra
            </Button>
            <Link component={RouterLink} to="/" sx={{ textAlign: 'center', fontSize: 15, fontWeight: 600 }}>
              Continuar comprando
            </Link>
          </Box>
        </Box>
      )}

      <Snackbar
        open={Boolean(removido)}
        autoHideDuration={6000}
        onClose={(_, motivo) => motivo !== 'clickaway' && setRemovido(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          variant="filled"
          sx={{ bgcolor: 'text.primary', color: 'background.paper' }}
          action={
            <Button color="inherit" size="small" onClick={desfazer} sx={{ fontWeight: 700 }}>
              Desfazer
            </Button>
          }
        >
          {removido?.item.nome} foi removido do carrinho.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Carrinho;
