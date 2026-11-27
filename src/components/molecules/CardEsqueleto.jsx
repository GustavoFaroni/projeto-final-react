import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

// Forma do card enquanto os produtos carregam: a página não "pula" quando eles chegam.
export default function CardEsqueleto() {
  return (
    <Card aria-hidden="true" sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" animation="wave" sx={{ aspectRatio: '1', height: 'auto', bgcolor: 'sage' }} />
      <Box sx={{ p: { xs: 1.5, sm: 2 }, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton width="80%" height={24} />
        <Skeleton width="45%" height={18} />
        <Skeleton width="40%" height={32} />
        <Skeleton variant="rounded" height={44} />
      </Box>
    </Card>
  );
}
