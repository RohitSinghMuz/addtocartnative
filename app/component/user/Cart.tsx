import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getFontSize, getHeight, getWidth} from '../../utils/responsiveScale';
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
      {cartItems.length > 0 ? (
        <View style={styles.rowTitle}>
          <Text style={styles.headerCell}>Brand Name</Text>
          <Text style={styles.headerCell}>minus</Text>
          <Text style={styles.headerCell}>Price</Text>
          <Text style={styles.headerCell}>Quin</Text>
          <Text style={styles.headerCell}>Plus</Text>
        </View>
      ) : null}

      {cartItems.map((item, index) => {
        return (
          <View key={item.id} style={styles.row}>
            <Text key={index} style={styles.titleStyle}>
              {item.brandName}
            </Text>

            <Text style={styles.titleStyle}>
              {cartItems.length > 0 && (
                <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
                  {item.quantity === 1 ? (
                    <AntDesign
                      name="close"
                      color="#9a9a9a"
                      size={25}
                      style={styles.icon}
                    />
                  ) : (
                    <AntDesign
                      name="minus"
                      color="#9a9a9a"
                      size={25}
                      style={styles.icon}
                    />
                  )}
                </TouchableOpacity>
              )}
            </Text>
            <Text style={styles.titleStyle}>${item.price}*</Text>
            <Text style={styles.titleStyle}> {item.quantity}</Text>

            <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
              <AntDesign
                name="plus"
                color="#9a9a9a"
                size={25}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        );
      })}

      {cartItems.length > 0 && (
        <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
      )}
    </View>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: getHeight(2),
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
    fontSize: getFontSize(5),
    margin: getFontSize(5),
    fontWeight: 'bold',
    color: 'red',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    marginHorizontal: getHeight(2),
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#9a9a9a',
    fontSize: getFontSize(3.4),
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: getHeight(2),
    marginHorizontal: getHeight(1),
  },
  titleStyle: {
    color: '#9a9a9a',
    fontWeight: 'bold',
    fontSize: getFontSize(4),
    fontFamily: 'Poppins',
  },
});
