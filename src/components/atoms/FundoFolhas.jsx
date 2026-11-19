import { cores } from '../../theme/theme';

const INTENSIDADE = 0.19;

const folha = 'M0 44 C0 20 20 0 44 0 C44 24 24 44 0 44 Z';
const nervura = 'M0 44 L26 18';

export default function FundoFolhas() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    >
      <defs>
        <pattern id="ns-folhas" width="220" height="220" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={cores.herb} strokeWidth="1.6" strokeLinecap="round" opacity={INTENSIDADE}>
            <g transform="translate(24 30)"><path d={folha} /><path d={nervura} /></g>
            <g transform="translate(150 96) rotate(90 22 22)"><path d={folha} /><path d={nervura} /></g>
            <g transform="translate(70 150) rotate(200 15 15) scale(0.7)"><path d={folha} /><path d={nervura} /></g>
          </g>
          <g fill={cores.herb} opacity={INTENSIDADE * 1.4}>
            <circle cx="120" cy="40" r="2" />
            <circle cx="30" cy="130" r="2" />
            <circle cx="190" cy="190" r="2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ns-folhas)" />
    </svg>
  );
}
