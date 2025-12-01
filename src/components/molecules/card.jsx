import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button } from '@mui/material';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../organism/home.png';

export default function ActionAreaCard({nome, valor ,produtoId}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 240, gridGap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            width="240"
            image={Img}
            alt={nome}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nome}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {valor}
          </Typography>
             
        </CardContent>
      </CardActionArea>
      <Button variant="contained" sx={{background: "green"}} onClick={() => navigate(`/Produto/${produtoId}`)} >Comprar</Button>
    </Card>
  );
}
