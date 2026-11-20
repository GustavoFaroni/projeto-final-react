import Box from '@mui/material/Box';

export default function SeloDesconto({ percentual, sx }) {
  return (
    <Box
      component="span"
      sx={{ bgcolor: 'secondary.main', color: 'text.primary', fontSize: 12, lineHeight: '16px', fontWeight: 600, borderRadius: '6px', px: 1, py: 0.5, ...sx }}
    >
      -{percentual}%
    </Box>
  );
}
