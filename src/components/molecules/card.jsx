import { Box, Button, Card, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatarPreco, precoFinal } from '../../utils/preco';
import { percentualDesconto, resumoAvaliacoes, temPromocao } from '../../utils/produto';
import imgProduto from '../../assets/img/frasco.webp';

export default function ProdutoCard({ produto, onAdicionar }) {
  const caminho = `/Produto/${produto._id}`;
  const moeda = produto.preco?.moeda;
  const promo = temPromocao(produto);

  return (
    <Card component="article" sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'box-shadow 200ms', '&:hover': { boxShadow: '0 6px 20px rgba(31, 42, 34, 0.08)' } }}>
      <Box
        component={RouterLink}
        to={caminho}
        tabIndex={-1}
        aria-hidden="true"
        sx={{ position: 'relative', display: 'block', aspectRatio: '1', bgcolor: 'sage' }}
      >
        <Box
          component="img"
          src={imgProduto}
          alt=""
          loading="lazy"
          width={800}
          height={800}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {promo && (
          <Box
            component="span"
            sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'secondary.main', color: 'text.primary', fontSize: 12, lineHeight: '16px', fontWeight: 600, borderRadius: '6px', px: 1, py: 0.5 }}
          >
            -{percentualDesconto(produto)}%
          </Box>
        )}
      </Box>

      <Box sx={{ p: { xs: 1.5, sm: 2 }, display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        <Link
          component={RouterLink}
          to={caminho}
          underline="hover"
          sx={{ color: 'text.primary', fontSize: 16, lineHeight: '22px', fontWeight: 600 }}
        >
          {produto.nome}
        </Link>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
          {resumoAvaliacoes(produto).texto}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 1, mt: 'auto', fontVariantNumeric: 'tabular-nums' }}>
          <Typography component="span" sx={{ fontSize: 20, lineHeight: '28px', fontWeight: 600, color: promo ? 'honeyInk' : 'primary.main' }}>
            {formatarPreco(precoFinal(produto), moeda)}
          </Typography>
          {promo && (
            <Typography component="span" variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              <Box component="span" sx={visualmenteOculto}>De </Box>
              {formatarPreco(produto.preco.valor, moeda)}
            </Typography>
          )}
        </Box>

        <Button
          variant="outlined"
          onClick={() => onAdicionar(produto)}
          aria-label={`Adicionar ${produto.nome} ao carrinho`}
          sx={{ minHeight: 44, borderWidth: 1.5, bgcolor: 'background.paper', fontSize: 15, px: 1 }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Adicionar ao carrinho</Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Adicionar</Box>
        </Button>
      </Box>
    </Card>
  );
}

const visualmenteOculto = {
  position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap',
};
