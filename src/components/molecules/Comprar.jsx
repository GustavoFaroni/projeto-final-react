import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


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
        
          return { ...item, quantidade: Math.max(1, item.quantidade + quant) };
        }
        return item;
      })
    );
  };

  
  const limparCarrinho = () => {
    setCartItems([]);
  };


  const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);


  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantidade), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        adicionarItem, 
        removerItem, 
        attQuantidade, 
        limparCarrinho,
        cartCount,
        cartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);