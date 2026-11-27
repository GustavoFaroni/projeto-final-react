import Box from '@mui/material/Box';

// Texto invisível na tela, mas lido por leitores de tela sempre que muda.
export default function AvisoLeitorDeTela({ children }) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}
    >
      {children}
    </Box>
  );
}
