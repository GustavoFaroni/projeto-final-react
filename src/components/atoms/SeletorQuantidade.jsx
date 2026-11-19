import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function SeletorQuantidade({ valor, onDiminuir, onAumentar, rotulo = 'Quantidade', max }) {
  const botao = { width: 44, height: 44, color: 'primary.main' };

  return (
    <Box
      role="group"
      aria-label={rotulo}
      sx={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid', borderColor: 'divider', borderRadius: '999px', bgcolor: 'background.paper' }}
    >
      <IconButton aria-label="Diminuir quantidade" onClick={onDiminuir} disabled={valor <= 1} sx={botao}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography aria-live="polite" sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        {valor}
      </Typography>
      <IconButton aria-label="Aumentar quantidade" onClick={onAumentar} disabled={max != null && valor >= max} sx={botao}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
