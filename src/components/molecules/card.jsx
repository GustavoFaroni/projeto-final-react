import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button } from '@mui/material';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ActionAreaCard({ imagem, nome, sobrenome , cargo, dtnascimento, produtoId}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imagem}
            alt={nome}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nome} {sobrenome} 
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {dtnascimento}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {cargo}
          </Typography>
             
        </CardContent>
      </CardActionArea>
      <Button variant="contained" onClick={() => navigate(`/Produto/${produtoId}`)} >Comprar</Button>
    </Card>
  );
}
