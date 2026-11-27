import { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'motion/react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const numero = {
  entra: (direcao) => ({ y: direcao > 0 ? '100%' : '-100%', opacity: 0 }),
  parado: { y: 0, opacity: 1 },
  sai: (direcao) => ({ y: direcao > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function SeletorQuantidade({ valor, onDiminuir, onAumentar, rotulo = 'Quantidade', max }) {
  // compara com o valor anterior para saber a direção da animação
  const anterior = useRef(valor);
  const direcao = valor >= anterior.current ? 1 : -1;
  useEffect(() => {
    anterior.current = valor;
  }, [valor]);

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
      {/* o número desliza para cima quando aumenta e para baixo quando diminui */}
      <Box aria-live="polite" sx={{ position: 'relative', minWidth: 32, height: 24, overflow: 'hidden', textAlign: 'center' }}>
        <AnimatePresence initial={false} custom={direcao} mode="popLayout">
          <Typography
            component={m.span}
            key={valor}
            custom={direcao}
            variants={numero}
            initial="entra"
            animate="parado"
            exit="sai"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            sx={{ display: 'block', fontWeight: 600, lineHeight: '24px', fontVariantNumeric: 'tabular-nums' }}
          >
            {valor}
          </Typography>
        </AnimatePresence>
      </Box>
      <IconButton aria-label="Aumentar quantidade" onClick={onAumentar} disabled={max != null && valor >= max} sx={botao}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
