import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartRestaurant, setCartRestaurant] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchCart();
    else { setCart([]); setCartRestaurant(null); }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/api/cart');
      setCart(data);
      if (data.length > 0 && data[0].menuItem?.restaurant) {
        setCartRestaurant(data[0].menuItem.restaurant);
      }
    } catch {}
  };

  const addToCart = async (menuItem, restaurantId) => {
    if (cart.length > 0 && cartRestaurant && cartRestaurant !== restaurantId) {
      return { conflict: true };
    }
    try {
      const { data } = await axios.post('/api/cart/add', { menuItemId: menuItem._id, quantity: 1 });
      setCart(data);
      setCartRestaurant(restaurantId);
      return { success: true };
    } catch (err) {
      return { error: err.response?.data?.message };
    }
  };

  const updateQuantity = async (menuItemId, quantity) => {
    try {
      const { data } = await axios.put('/api/cart/update', { menuItemId, quantity });
      setCart(data);
      if (data.length === 0) setCartRestaurant(null);
    } catch {}
  };

  const removeFromCart = async (menuItemId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuItemId}`);
      setCart(data);
      if (data.length === 0) setCartRestaurant(null);
    } catch {}
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart/clear');
      setCart([]);
      setCartRestaurant(null);
    } catch {}
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.menuItem?.price || 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartTotal, cartCount, cartRestaurant, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
