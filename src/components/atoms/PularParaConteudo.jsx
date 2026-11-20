import { Box } from '@mui/material';

export default function PularParaConteudo() {
  return (
    <Box
      component="a"
      href="#conteudo"
      sx={{
        position: 'absolute',
        left: 16,
        top: -64,
        zIndex: 20,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        px: 2,
        py: 1.5,
        borderRadius: '10px',
        fontWeight: 600,
        textDecoration: 'none',
        '&:focus-visible': { top: 12, outline: '2px solid', outlineColor: 'primary.dark', outlineOffset: 2 },
      }}
    >
      Pular para o conteúdo
    </Box>
  );
}
