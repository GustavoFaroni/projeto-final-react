import { Box, IconButton, Badge, Link } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../../context/CartContext';
import Logo from '../atoms/Logo';

const links = [
  { rotulo: 'Produtos', para: '/#mais-vendidos' },
  { rotulo: 'Sobre', para: '/sobre' },
  { rotulo: 'Contato', para: '/contato' },
];

function NavHeader() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const rotuloCarrinho = cartCount === 1 ? 'Carrinho, 1 item' : `Carrinho, ${cartCount} itens`;

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: 'rgba(255, 255, 255, 0.86)',
        backdropFilter: 'blur(6px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: 2,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Logo />

        <Box component="nav" aria-label="Principal" sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          {links.map((link) => (
            <Link
              key={link.rotulo}
              component={NavLink}
              to={link.para}
              end
              underline="hover"
              sx={{
                color: 'text.primary',
                fontSize: 15,
                fontWeight: 500,
                '&[aria-current="page"]': { color: 'primary.main', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '6px' },
              }}
            >
              {link.rotulo}
            </Link>
          ))}
        </Box>

        <IconButton
          aria-label={rotuloCarrinho}
          onClick={() => navigate('/carrinho')}
          sx={{ width: 44, height: 44, color: 'text.primary' }}
        >
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}

export default NavHeader;
