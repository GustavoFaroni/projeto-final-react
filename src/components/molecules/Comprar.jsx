import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const salvoCarrinho = localStorage.getItem('carrinho');
    return salvoCarrinho ? JSON.parse(salvoCarrinho) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(cartItems));
  }, [cartItems]);

  
  const adicionarItem = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item._id === product._id);
      
      if (itemExists) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantidade: 1 }];
    });
  };

  
  const removerItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  
  const attQuantidade = (productId, quant) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => {
        if (item._id === productId) {
          const novaQuantidade = item.quantidade + quant;
          return { ...item, quantidade: novaQuantidade > 0 ? novaQuantidade : 1 };
        }
        return item;
      })
    );
  };

  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cartItems, adicionarItem, removerItem, attQuantidade, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);