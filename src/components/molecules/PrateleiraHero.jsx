import { m, useReducedMotion } from 'motion/react';
import Box from '@mui/material/Box';

// Três produtos "pousando" na prateleira, um depois do outro.
// É o único movimento automático da loja: o resto só se mexe quando a pessoa age.
const produtos = [
  { arquivo: 'omega-3', largura: '30%', altura: '78%', z: 1 },
  { arquivo: 'whey-baunilha', largura: '38%', altura: '100%', z: 2 },
  { arquivo: 'multivitaminico', largura: '30%', altura: '80%', z: 1 },
];

const MotionBox = m.create(Box);

export default function PrateleiraHero({ animar = true }) {
  const reduzir = useReducedMotion() || !animar;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        aspectRatio: '5 / 4',
        borderRadius: '24px',
        overflow: 'hidden',
        // mesmo tom do fundo das fotos, para os produtos parecerem estar no mesmo ambiente
        background: 'linear-gradient(160deg, #EEE9DF 0%, #E6E0D3 100%)',
        isolation: 'isolate',
      }}
    >
      {/* luz suave vinda da esquerda */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(120% 90% at 15% 10%, rgba(255,255,255,0.75), rgba(255,255,255,0) 60%)',
        }}
      />

      {/* folha grande desenhada ao fundo */}
      <MotionBox
        component="svg"
        viewBox="0 0 200 200"
        initial={reduzir ? false : { opacity: 0, rotate: -8 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        sx={{ position: 'absolute', right: '-6%', top: '-10%', width: '62%', color: 'primary.main' }}
      >
        <path d="M20 180 C20 90 90 20 180 20 C180 110 110 180 20 180 Z" fill="currentColor" />
      </MotionBox>

      {/* prateleira */}
      <MotionBox
        initial={reduzir ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          bottom: '17%',
          height: 10,
          borderRadius: '4px',
          transformOrigin: 'left',
          background: 'linear-gradient(180deg, #C9B48E 0%, #A88E63 100%)',
          boxShadow: '0 14px 22px -10px rgba(60, 45, 20, 0.45)',
          zIndex: 3,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          bottom: 'calc(17% + 8px)',
          height: '64%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '2%',
          zIndex: 2,
        }}
      >
        {produtos.map((p, i) => (
          <MotionBox
            key={p.arquivo}
            initial={reduzir ? false : { y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.45 + i * 0.14 }}
            sx={{ width: p.largura, height: p.altura, zIndex: p.z, position: 'relative' }}
          >
            <Box
              component="img"
              src={`/produtos/${p.arquivo}.webp`}
              alt=""
              width={800}
              height={800}
              fetchPriority={i === 1 ? 'high' : 'auto'}
              sx={{
                position: 'absolute',
                left: 0,
                bottom: '-15%', // a base do frasco fica a ~85% da altura da foto: assim ele encosta na prateleira
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: '50% 50%',
                // as bordas da foto somem aos poucos, sem recorte aparente
                maskImage: 'radial-gradient(ellipse 50% 62% at 50% 50%, #000 72%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 62% at 50% 50%, #000 72%, transparent 100%)',
              }}
            />
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}
