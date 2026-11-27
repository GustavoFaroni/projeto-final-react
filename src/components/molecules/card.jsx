import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { formatarPreco, precoFinal } from '../../utils/preco';
import { percentualDesconto, resumoAvaliacoes, temPromocao } from '../../utils/produto';
import SeloDesconto from '../atoms/SeloDesconto';
import { imagemDoProduto, usarImagemPadraoSeFalhar } from '../../utils/imagem';

export default function ProdutoCard({ produto, onAdicionar }) {
  const caminho = `/Produto/${produto._id}`;
  const moeda = produto.preco?.moeda;
  const promo = temPromocao(produto);
  const imagemRef = useRef(null);

  return (
    <Card
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 250ms ease, transform 250ms ease',
        '&:hover': { boxShadow: '0 10px 28px rgba(31, 42, 34, 0.10)' },
        '&:hover img': { transform: 'scale(1.04)' },
      }}
    >
      <Box
        component={RouterLink}
        to={caminho}
        tabIndex={-1}
        aria-hidden="true"
        sx={{ position: 'relative', display: 'block', aspectRatio: '1', bgcolor: 'sage', overflow: 'hidden' }}
      >
        <Box
          component="img"
          ref={imagemRef}
          src={imagemDoProduto(produto)}
          onError={usarImagemPadraoSeFalhar}
          alt=""
          loading="lazy"
          width={800}
          height={800}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {promo && (
          <SeloDesconto percentual={percentualDesconto(produto)} sx={{ position: 'absolute', top: 12, left: 12 }} />
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
          onClick={() => onAdicionar(produto, imagemRef.current)}
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
