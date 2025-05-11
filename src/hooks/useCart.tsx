import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/product';
import { products } from '@/data/products';

interface CartContextType {
  cartItems: (CartItem & { name?: string; description?: string; price?: number; imageUrl?: string })[];
  addToCart: (item: CartItem & { name?: string; description?: string; price?: number; imageUrl?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<(CartItem & { 
    name?: string; 
    description?: string; 
    price?: number; 
    imageUrl?: string 
  })[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('empowera-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('empowera-cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('empowera-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (item: CartItem & { 
    name?: string; 
    description?: string; 
    price?: number; 
    imageUrl?: string 
  }) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(i => 
        i.productId === item.productId &&
        i.color === item.color && 
        i.size === item.size && 
        i.material === item.material
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, item];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculate total number of items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price of items in cart
  const cartTotal = cartItems.reduce((total, item) => {
    // If it's a custom item with price (like donation)
    if (item.price !== undefined) {
      return total + (item.price * item.quantity);
    }
    
    // Otherwise look up product from catalog
    const product = products.find(p => p.id === item.productId);
    if (!product) return total;
    
    const price = product.discountedPrice || product.price;
    return total + (price * item.quantity);
  }, 0);
  
  return (
    <CartContext.Provider 
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
