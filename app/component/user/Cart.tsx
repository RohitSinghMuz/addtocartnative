import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getHeight, getWidth} from '../../utils/responsiveScale';
import Userhome from './Userhome';
import {useFocusEffect} from '@react-navigation/native';

interface CartItem {
  id: number;
  brandName: string;
  price: number | null;
  quantity: number;
}

const Cart: React.FC<{navigation: any}> = ({navigation}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  console.log('cartItems------Cart', cartItems);
  useEffect(() => {
    loadCartData();
    // AsyncStorage.removeItem('cartItems');
    // AsyncStorage.removeItem('totalAmount');
  }, []);

  useEffect(() => {
    loadCartData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      updateLocalStorage();
    }, [cartItems, totalAmount]),
  );

  const loadCartData = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      const storedTotalAmount = await AsyncStorage.getItem('totalAmount');

      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }

      if (storedTotalAmount) {
        setTotalAmount(JSON.parse(storedTotalAmount));
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  const updateLocalStorage = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      await AsyncStorage.setItem('totalAmount', JSON.stringify(totalAmount));
    } catch (error) {
      console.error('Error updating local storage:', error);
    }
  };

  const handleRemoveFromCart = (item: CartItem) => {
    if (item.price !== null) {
      const updatedCartItems = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem,
      );

      const updatedTotalAmount = totalAmount - (item.price || 0);

      setCartItems(updatedCartItems.filter(cartItem => cartItem.quantity > 0));
      setTotalAmount(updatedTotalAmount);

      updateLocalStorage();

      if (updatedCartItems.length === 0) {
        AsyncStorage.removeItem('cartItems');
        AsyncStorage.removeItem('totalAmount');
      }
    }
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem,
    );

    const updatedTotalAmount = totalAmount + (item.price || 0);

    setCartItems(updatedCartItems);
    setTotalAmount(updatedTotalAmount);

    updateLocalStorage();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartContainer}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemText}>
              {item.brandName}
              {cartItems.length > 0 && (
                <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
                  {item.quantity === 1 ? (
                    <AntDesign
                      name="close"
                      color="black"
                      size={20}
                      style={styles.icon}
                    />
                  ) : (
                    <AntDesign
                      name="minus"
                      color="black"
                      size={20}
                      style={styles.icon}
                    />
                  )}
                </TouchableOpacity>
              )}
              ${item.price}*{item.quantity}
              <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                <AntDesign
                  name="plus"
                  color="black"
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </Text>
          </View>
        ))}
        {cartItems.length > 0 && (
          <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
        )}
      </View>
    </View>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  cartContainer: {
    backgroundColor: 'grey',
    padding: 10,
  },
  cartItem: {
    marginBottom: 10,
  },
  itemText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: 18,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  totalAmount: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
