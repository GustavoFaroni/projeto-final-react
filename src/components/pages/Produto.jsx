import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useProduto } from '../../hooks/useProdutos';
import { useCart } from '../../context/CartContext';
import { formatarPreco, precoFinal } from '../../utils/preco';
import { percentualDesconto, resumoAvaliacoes, temPromocao } from '../../utils/produto';
import SeletorQuantidade from '../atoms/SeletorQuantidade';
import { useTituloPagina } from '../../hooks/useTituloPagina';
import SeloDesconto from '../atoms/SeloDesconto';
import { imagemDoProduto, usarImagemPadraoSeFalhar } from '../../utils/imagem';

const cartao = { bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: '16px' };

const estrelas = (nota) => {
  const n = Math.min(5, Math.max(0, Math.round(nota)));
  return '★'.repeat(n) + '☆'.repeat(5 - n);
};

function Centralizado({ children }) {
  return <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, px: 2 }}>{children}</Box>;
}

const Produto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { produto, carregando } = useProduto(id);
  const { adicionarItem } = useCart();
  const [fotoAtual, setFotoAtual] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  useTituloPagina(produto?.nome ?? (carregando ? 'Carregando…' : 'Produto não encontrado'));

  if (carregando) {
    return (
      <Centralizado>
        <CircularProgress aria-label="Carregando produto" />
      </Centralizado>
    );
  }

  if (!produto) {
    return (
      <Centralizado>
        <Typography variant="h2" component="h1" sx={{ fontSize: 28 }}>Produto não encontrado</Typography>
        <Button variant="contained" component={RouterLink} to="/">Voltar para a loja</Button>
      </Centralizado>
    );
  }

  const fotos = [imagemDoProduto(produto)];
  const moeda = produto.preco?.moeda;
  const promo = temPromocao(produto);
  const avaliacoes = resumoAvaliacoes(produto);
  const estoque = produto.estoque;
  const esgotado = estoque === 0;

  const detalhes = [
    avaliacoes.textoCurto,
    estoque != null && (esgotado ? 'Esgotado' : `${estoque} em estoque`),
  ].filter(Boolean).join(' · ');

  const adicionar = () => {
    adicionarItem(
      { _id: produto._id, nome: produto.nome, preco: precoFinal(produto), fornecedor: produto.fornecedor?.nome, imagem: produto.imagem },
      quantidade
    );
    setAdicionado(true);
    setQuantidade(1);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, pt: 3, pb: 8 }}>
      <Box component="nav" aria-label="Você está em" sx={{ fontSize: 14, color: 'text.secondary', mb: 3 }}>
        <Link component={RouterLink} to="/">Início</Link>
        <Box component="span" aria-hidden="true" sx={{ mx: 1 }}>/</Box>
        <Link component={RouterLink} to="/#mais-vendidos">Produtos</Link>
        <Box component="span" aria-hidden="true" sx={{ mx: 1 }}>/</Box>
        <Box component="span" aria-current="page" sx={{ color: 'text.primary' }}>{produto.nome}</Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'flex-start' }}>
        <Box sx={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ position: 'relative', aspectRatio: '1', bgcolor: 'sage', borderRadius: '16px', overflow: 'hidden' }}>
            <Box
              component="img"
              src={fotos[fotoAtual] ?? fotos[0]}
              onError={usarImagemPadraoSeFalhar}
              alt={fotos.length > 1 ? `${produto.nome}, foto ${fotoAtual + 1} de ${fotos.length}` : produto.nome}
              width={800}
              height={800}
              fetchPriority="high"
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {promo && <SeloDesconto percentual={percentualDesconto(produto)} sx={{ position: 'absolute', top: 16, left: 16 }} />}
          </Box>
          {fotos.length > 1 && (
          <Box role="group" aria-label="Fotos do produto" sx={{ display: 'flex', gap: 1.5 }}>
            {fotos.map((foto, i) => (
              <Box
                key={foto}
                component="button"
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                aria-pressed={i === fotoAtual}
                onClick={() => setFotoAtual(i)}
                sx={{
                  width: 88,
                  height: 88,
                  p: 0,
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  bgcolor: 'sage',
                  border: '2px solid',
                  borderColor: i === fotoAtual ? 'primary.main' : 'transparent',
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                }}
              >
                <Box component="img" src={foto} alt="" loading="lazy" onError={usarImagemPadraoSeFalhar} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </Box>
            ))}
          </Box>
          )}
        </Box>

        <Box sx={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: 30, md: 36 }, lineHeight: 1.2, textWrap: 'balance' }}>
              {produto.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary">{detalhes}</Typography>
          </Box>

          <Box sx={{ ...cartao, p: 3, display: 'flex', flexDirection: 'column', gap: 1, fontVariantNumeric: 'tabular-nums' }}>
            {promo && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SeloDesconto percentual={percentualDesconto(produto)} />
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatarPreco(produto.preco.valor, moeda)}
                </Typography>
              </Box>
            )}
            <Typography sx={{ fontSize: 32, lineHeight: '40px', fontWeight: 600, color: promo ? 'honeyInk' : 'primary.main' }}>
              {formatarPreco(precoFinal(produto), moeda)}
            </Typography>
            {promo && (
              <Typography variant="body2" sx={{ color: 'honeyInk', fontWeight: 500 }}>
                Você economiza {formatarPreco(produto.preco.valor - produto.preco.promocional, moeda)}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
            <SeletorQuantidade
              valor={quantidade}
              max={estoque ?? undefined}
              onDiminuir={() => setQuantidade((q) => Math.max(1, q - 1))}
              onAumentar={() => setQuantidade((q) => q + 1)}
            />
            <Button
              variant="contained"
              size="large"
              disabled={esgotado}
              onClick={adicionar}
              sx={{ flex: '1 1 220px', minHeight: 48, fontSize: 16 }}
            >
              {esgotado ? 'Esgotado' : 'Adicionar ao carrinho'}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Vendido por{' '}
            <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>{produto.fornecedor?.nome ?? 'Natural Supplements'}</Box>
            {' '}e entregue por{' '}
            <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>Natural Supplements</Box>
          </Typography>
        </Box>
      </Box>

      <Box component="section" sx={{ mt: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
          <Typography variant="h2" sx={{ fontSize: 28, lineHeight: '36px', mb: 2 }}>Descrição</Typography>
          <Typography sx={{ maxWidth: '65ch' }}>{produto.descricao || 'Este produto ainda não tem descrição.'}</Typography>
        </Box>
        <Box sx={{ flex: '1 1 380px', minWidth: 0 }}>
          <Typography variant="h2" sx={{ fontSize: 28, lineHeight: '36px', mb: 2 }}>Avaliações</Typography>
          {avaliacoes.total === 0 ? (
            <Typography color="text.secondary">Ninguém avaliou este produto ainda.</Typography>
          ) : (
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {produto.avaliacao.map((av, i) => (
                <Box component="li" key={av._id ?? i} sx={{ ...cartao, p: 2 }}>
                  <Typography component="span" aria-label={`Nota ${av.nota} de 5`} sx={{ color: 'primary.main' }}>
                    {estrelas(av.nota)}
                  </Typography>
                  {av.comentario && <Typography sx={{ mt: 0.5, fontSize: 15 }}>{av.comentario}</Typography>}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        open={adicionado}
        autoHideDuration={4000}
        onClose={() => setAdicionado(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          icon={<CheckCircleOutlineIcon />}
          severity="success"
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/carrinho')}>
              Ver carrinho
            </Button>
          }
        >
          Adicionado ao carrinho
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Produto;
