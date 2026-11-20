import { useEffect } from 'react';

const MARCA = 'Natural Supplements';

export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | ${MARCA}` : MARCA;
  }, [titulo]);
}
