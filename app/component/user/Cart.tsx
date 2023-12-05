import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getHeigth, getWidth} from '../../utils/responsiveScale';

interface CartItem {
  id: number;
  brandName: string;
  price: number | null;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    loadCartData();
  }, []);

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
      const existingCartItem = cartItems.find(
        cartItem => cartItem.id === item.id,
      );

      if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
          setCartItems(prevCartItems =>
            prevCartItems.filter(
              cartItem => cartItem.id !== existingCartItem.id,
            ),
          );
        } else {
          existingCartItem.quantity -= 1;
        }

        setTotalAmount(prevTotalAmount => prevTotalAmount - (item.price || 0));
        updateLocalStorage();
      }
    }
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === item.id,
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    }

    setTotalAmount(prevTotalAmount => prevTotalAmount + (item.price || 0));
    updateLocalStorage();
  };
  return (
    <View>
      <Text>Cart Page</Text>
      <View style={{margin: 10}}>
        {cartItems.map((item, index) => (
          <View key={item.id}>
            <Text>
              {item.brandName}
              {cartItems.length > 0 ? (
                <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
                  {item.quantity === 1 ? (
                    <AntDesign
                      name="close"
                      color="black"
                      size={20}
                      style={styles.buttonTextStyle}
                    />
                  ) : (
                    <AntDesign
                      name="minus"
                      color="black"
                      size={20}
                      style={styles.buttonTextStyle}
                    />
                  )}
                </TouchableOpacity>
              ) : null}
              ${item.price}*{item.quantity}
              <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                <AntDesign
                  name="plus"
                  color="black"
                  size={20}
                  style={styles.buttonTextStyle}
                />
              </TouchableOpacity>
            </Text>
          </View>
        ))}
        {cartItems.length > 0 ? (
          <Text>Total Amount: ${totalAmount}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  buttonTextStyle: {
    width: getWidth(6),
    height: getHeigth(2.4),
    margin: getHeigth(0.2),
  },
});
