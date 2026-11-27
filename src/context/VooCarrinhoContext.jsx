import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';

// Quando a pessoa adiciona um produto, uma cópia da foto "voa" até o ícone do carrinho.
// Isso mostra para onde o item foi, sem precisar de texto.
const VooCarrinhoContext = createContext(null);

let proximoId = 0;

export function VooCarrinhoProvider({ children }) {
  const [voos, setVoos] = useState([]);
  const [pulso, setPulso] = useState(0); // muda a cada chegada: o ícone do carrinho "pula"
  const reduzir = useReducedMotion();

  const voarParaCarrinho = useCallback(
    (imagem) => {
      const destino = document.getElementById('botao-carrinho');
      if (!imagem || !destino || reduzir) {
        setPulso((p) => p + 1);
        return;
      }
      const de = imagem.getBoundingClientRect();
      const para = destino.getBoundingClientRect();
      const tamanho = Math.min(de.width, de.height, 160);
      setVoos((lista) => [
        ...lista,
        {
          id: ++proximoId,
          src: imagem.currentSrc || imagem.src,
          tamanho,
          inicio: { x: de.left + de.width / 2 - tamanho / 2, y: de.top + de.height / 2 - tamanho / 2 },
          fim: { x: para.left + para.width / 2 - tamanho / 2, y: para.top + para.height / 2 - tamanho / 2 },
        },
      ]);
    },
    [reduzir]
  );

  const chegou = (id) => {
    setVoos((lista) => lista.filter((v) => v.id !== id));
    setPulso((p) => p + 1);
  };

  const valor = useMemo(() => ({ voarParaCarrinho, pulso }), [voarParaCarrinho, pulso]);

  return (
    <VooCarrinhoContext.Provider value={valor}>
      {children}
      {createPortal(
        <AnimatePresence>
          {voos.map((v) => (
            <m.img
              key={v.id}
              src={v.src}
              alt=""
              aria-hidden="true"
              initial={{ x: v.inicio.x, y: v.inicio.y, scale: 1, opacity: 1, borderRadius: 16 }}
              animate={{
                // sobe um pouco antes de ir: a curva deixa o caminho mais natural
                x: [v.inicio.x, (v.inicio.x + v.fim.x) / 2, v.fim.x],
                y: [v.inicio.y, Math.max(8, Math.min(v.inicio.y, v.fim.y) - 80), v.fim.y],
                scale: [1, 0.7, 0.12],
                opacity: [1, 1, 0.6],
                borderRadius: [16, 40, 80],
              }}
              transition={{ duration: 0.75, ease: [0.45, 0, 0.2, 1], times: [0, 0.45, 1] }}
              onAnimationComplete={() => chegou(v.id)}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: v.tamanho,
                height: v.tamanho,
                objectFit: 'cover',
                zIndex: 2000,
                pointerEvents: 'none',
                boxShadow: '0 12px 30px rgba(31, 42, 34, 0.25)',
              }}
            />
          ))}
        </AnimatePresence>,
        document.body
      )}
    </VooCarrinhoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVooCarrinho() {
  const contexto = useContext(VooCarrinhoContext);
  if (!contexto) throw new Error('useVooCarrinho precisa estar dentro de <VooCarrinhoProvider>');
  return contexto;
}
