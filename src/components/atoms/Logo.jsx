import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

export default function Logo() {
  return (
    <Box
      component={RouterLink}
      to="/"
      aria-label="Natural Supplements, página inicial"
      sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', textDecoration: 'none' }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <path d="M4 24 C4 12 12 4 24 4 C24 16 16 24 4 24 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4 24 L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <Box
        component="span"
        translate="no"
        sx={{ fontFamily: '"Lora", Georgia, serif', fontWeight: 600, fontSize: { xs: 18, sm: 20 }, lineHeight: '28px' }}
      >
        Natural Supplements
      </Box>
    </Box>
  );
}
