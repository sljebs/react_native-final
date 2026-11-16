import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (error) {
      console.error('Error loading storage', error);
    }
  };

  const login = async (userData, rememberMe) => {
    setUser(userData);
    if (rememberMe) {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const addToCart = async (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};