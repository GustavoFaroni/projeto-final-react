import { createContext, useContext, useEffect, useMemo, useState } from 'react';

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

  const adicionarItem = (produto, quantidade = 1) => {
    setCartItems((itens) => {
      const existe = itens.some((item) => item._id === produto._id);
      if (existe) {
        return itens.map((item) =>
          item._id === produto._id ? { ...item, quantidade: item.quantidade + quantidade } : item
        );
      }
      return [...itens, { ...produto, quantidade }];
    });
  };

  const removerItem = (produtoId) => {
    setCartItems((itens) => itens.filter((item) => item._id !== produtoId));
  };

  const attQuantidade = (produtoId, delta) => {
    setCartItems((itens) =>
      itens.map((item) =>
        item._id === produtoId ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item
      )
    );
  };

  const limparCarrinho = () => setCartItems([]);

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

  return (
    <CartContext.Provider
      value={{ cartItems, adicionarItem, removerItem, attQuantidade, limparCarrinho, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const contexto = useContext(CartContext);
  if (!contexto) throw new Error('useCart precisa estar dentro de <CartProvider>');
  return contexto;
};
