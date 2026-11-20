import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CHAVE_STORAGE = 'natural-supplements:carrinho:v1';

const CartContext = createContext(null);

function lerCarrinhoSalvo() {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    const itens = salvo ? JSON.parse(salvo) : [];
    return Array.isArray(itens) ? itens : [];
  } catch {
    return [];
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(lerCarrinhoSalvo);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(cartItems));
    } catch {
      // navegador sem storage (aba anônima cheia, por exemplo): o carrinho segue só na memória
    }
  }, [cartItems]);

  const adicionarItem = useCallback((produto, quantidade = 1) => {
    setCartItems((itens) => {
      const existe = itens.some((item) => item._id === produto._id);
      if (existe) {
        return itens.map((item) =>
          item._id === produto._id ? { ...item, quantidade: item.quantidade + quantidade } : item
        );
      }
      return [...itens, { ...produto, quantidade }];
    });
  }, []);

  const removerItem = useCallback((produtoId) => {
    setCartItems((itens) => itens.filter((item) => item._id !== produtoId));
  }, []);

  const attQuantidade = useCallback((produtoId, delta) => {
    setCartItems((itens) =>
      itens.map((item) =>
        item._id === produtoId ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item
      )
    );
  }, []);

  // Devolve um item removido para a mesma posição (usado pelo "Desfazer").
  const restaurarItem = useCallback((item, posicao) => {
    setCartItems((itens) => {
      if (itens.some((i) => i._id === item._id)) return itens;
      const copia = [...itens];
      copia.splice(Math.min(posicao, copia.length), 0, item);
      return copia;
    });
  }, []);

  const limparCarrinho = useCallback(() => setCartItems([]), []);

  const { cartCount, cartTotal } = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => ({
          cartCount: acc.cartCount + item.quantidade,
          cartTotal: acc.cartTotal + item.preco * item.quantidade,
        }),
        { cartCount: 0, cartTotal: 0 }
      ),
    [cartItems]
  );

  // Só cria um objeto novo quando o carrinho muda: evita renderizar de novo quem usa o contexto à toa.
  const valor = useMemo(
    () => ({ cartItems, adicionarItem, removerItem, restaurarItem, attQuantidade, limparCarrinho, cartCount, cartTotal }),
    [cartItems, adicionarItem, removerItem, restaurarItem, attQuantidade, limparCarrinho, cartCount, cartTotal]
  );

  return (
    <CartContext.Provider value={valor}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const contexto = useContext(CartContext);
  if (!contexto) throw new Error('useCart precisa estar dentro de <CartProvider>');
  return contexto;
};
