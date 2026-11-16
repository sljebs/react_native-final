import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PRODUCTS from '../data/products';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  async function loadStoredData() {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const savedCart = JSON.parse(storedCart);
        const normalizedCart = savedCart.map((item) => {
          const product = PRODUCTS.find((catalogItem) => catalogItem.id === item.id);
          if (!product) return item;

          return {
            ...product,
            quantity: Math.min(item.quantity, 10, product.stock),
          }
        }).filter((item) => item.quantity > 0);

        setCart(normalizedCart);
        if (JSON.stringify(savedCart) !== JSON.stringify(normalizedCart)) {
          await AsyncStorage.setItem('cart', JSON.stringify(normalizedCart));
        }
      }
    } catch (error) {
      console.error('Error loading storage', error);
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

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

  const addToCart = async (product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    const currentQuantity = existingIndex > -1 ? cart[existingIndex].quantity : 0;
    const maxQuantity = Math.min(10, product.stock ?? 10);

    if (!Number.isInteger(quantity) || quantity < 1 || currentQuantity + quantity > maxQuantity) {
      Alert.alert('რაოდენობა არასწორია', `ამ პროდუქტის კალათაში მაქსიმუმ ${maxQuantity} ცალის დამატებაა შესაძლებელი.`);
      return false;
    }

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = cart.map((item, index) => (
        index === existingIndex ? { ...item, quantity: currentQuantity + quantity } : item
      ));
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    return true;
  };

  const updateCartQuantity = async (productId, quantity) => {
    const item = cart.find((cartItem) => cartItem.id === productId);
    if (!item) return;

    const maxQuantity = Math.min(10, item.stock ?? 10);
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > maxQuantity) {
      Alert.alert('რაოდენობა არასწორია', `აირჩიეთ 0-დან ${maxQuantity}-მდე ცალი.`);
      return;
    }

    const updatedCart = quantity === 0
      ? cart.filter((cartItem) => cartItem.id !== productId)
      : cart.map((cartItem) => (
        cartItem.id === productId ? { ...cartItem, quantity } : cartItem
      ));
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, updateCartQuantity, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};