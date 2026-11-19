import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ position: 'relative', zIndex: 1, bgcolor: 'rgba(255, 255, 255, 0.86)', borderTop: 1, borderColor: 'divider' }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: 2,
          py: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          color: 'text.secondary',
        }}
      >
        <Typography sx={{ fontFamily: '"Lora", Georgia, serif', fontWeight: 600, fontSize: 18, color: 'primary.main' }}>
          Natural Supplements
        </Typography>
        <Typography variant="body2">Projeto de portfólio de Gustavo Faroni · React e Node.js</Typography>
        <Link href="https://github.com/GustavoFaroni" target="_blank" rel="noopener noreferrer" fontWeight={600}>
          GitHub
        </Link>
      </Box>
    </Box>
  );
}
