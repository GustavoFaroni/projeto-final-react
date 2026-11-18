import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Img from '../organism/produtoCard.png';

export default function ActionAreaCard({ nome, valor, produtoId }) {
  const navigate = useNavigate();
  const abrirProduto = () => navigate(`/Produto/${produtoId}`);

  return (
    <Card sx={{ maxWidth: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardActionArea onClick={abrirProduto}>
        <CardMedia component="img" height="240" image={Img} alt={nome} loading="lazy" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {nome}
          </Typography>
          <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
            {valor}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button variant="contained" onClick={abrirProduto} sx={{ m: 2, mt: 0 }}>
        Comprar
      </Button>
    </Card>
  );
}
