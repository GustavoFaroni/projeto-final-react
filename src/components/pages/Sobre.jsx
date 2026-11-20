import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Chip, Typography } from '@mui/material';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const cartao = { bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: '16px' };

const valores = [
  {
    icone: SpaOutlinedIcon,
    titulo: 'Ingredientes de verdade',
    texto: 'Fórmulas com poucos ingredientes, escolhidos para o dia a dia de quem busca bem-estar.',
  },
  {
    icone: FactCheckOutlinedIcon,
    titulo: 'Informação clara',
    texto: 'Rótulos diretos e descrições honestas, sem promessas milagrosas.',
  },
  {
    icone: LocalShippingOutlinedIcon,
    titulo: 'Sem complicação',
    texto: 'Frete grátis e um carrinho simples, para você comprar em poucos cliques.',
  },
];

const tecnologias = ['React', 'Vite', 'Material UI', 'React Router', 'Context API', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vercel'];

const links = [
  { rotulo: 'Código da loja', href: 'https://github.com/GustavoFaroni/projeto-final-react', icone: <GitHubIcon /> },
  { rotulo: 'Código da API', href: 'https://github.com/GustavoFaroni/loja-api', icone: <GitHubIcon /> },
  { rotulo: 'LinkedIn', href: 'https://www.linkedin.com/in/gustavo-faroni-bentevengo', icone: <LinkedInIcon /> },
];

const Sobre = () => (
  <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, pt: { xs: 4, md: 6 }, pb: 8, display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 8 } }}>
    <Box component="section" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
      <Box sx={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.08em', lineHeight: 1 }}>
          Sobre nós
        </Typography>
        <Typography variant="h1" sx={{ fontSize: 'clamp(34px, 4vw, 48px)', lineHeight: 1.15, textWrap: 'balance' }}>
          Suplementos simples, para uma rotina mais leve.
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: '28px', color: 'text.secondary', maxWidth: '52ch' }}>
          A Natural Supplements nasceu da ideia de que cuidar da saúde não precisa ser complicado. Reunimos
          suplementos do dia a dia, com informação clara e um jeito calmo de comprar.
        </Typography>
        <Box>
          <Button variant="contained" size="large" component={RouterLink} to="/#mais-vendidos" sx={{ minHeight: 48, px: 3.5, fontSize: 16 }}>
            Ver produtos
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ flex: '1 1 320px', minWidth: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
        aria-hidden="true"
      >
        {['whey-baunilha', 'omega-3', 'colageno', 'multivitaminico'].map((nome) => (
          <Box
            key={nome}
            component="img"
            src={`/produtos/${nome}.webp`}
            alt=""
            loading="lazy"
            width={800}
            height={800}
            sx={{ width: '100%', height: 'auto', aspectRatio: '1', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
          />
        ))}
      </Box>
    </Box>

    <Box component="section" aria-labelledby="titulo-valores">
      <Typography id="titulo-valores" variant="h2" sx={{ fontSize: 28, lineHeight: '36px', mb: 3 }}>
        No que acreditamos
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' } }}>
        {valores.map(({ icone: Icone, titulo, texto }) => (
          <Box component="li" key={titulo} sx={{ ...cartao, p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: 'sage', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icone aria-hidden="true" />
            </Box>
            <Typography variant="h3" sx={{ fontSize: 20, lineHeight: '28px', fontWeight: 600 }}>{titulo}</Typography>
            <Typography color="text.secondary">{texto}</Typography>
          </Box>
        ))}
      </Box>
    </Box>

    <Box component="section" aria-labelledby="titulo-projeto" sx={{ ...cartao, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Typography id="titulo-projeto" variant="h2" sx={{ fontSize: 28, lineHeight: '36px' }}>
        Sobre este projeto
      </Typography>
      <Typography sx={{ maxWidth: '70ch' }}>
        A Natural Supplements é uma loja de demonstração, criada por <strong>Gustavo Faroni</strong> como projeto de
        portfólio. O front-end foi feito em React e consome uma API própria em Node.js, com produtos no MongoDB e
        rotas de escrita protegidas por login. Nenhuma compra é cobrada de verdade.
      </Typography>
      <Box component="ul" aria-label="Tecnologias usadas" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tecnologias.map((t) => (
          <li key={t}>
            <Chip label={t} sx={{ bgcolor: 'sage', color: 'primary.dark', fontWeight: 500 }} />
          </li>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, pt: 1 }}>
        {links.map((l) => (
          <Button
            key={l.rotulo}
            variant="outlined"
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={l.icone}
            sx={{ minHeight: 44, borderWidth: 1.5, bgcolor: 'background.paper' }}
          >
            {l.rotulo}
          </Button>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Sobre;
