import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getFontSize, getWidth, getHeight} from '../../utils/responsiveScale';
import {useFocusEffect} from '@react-navigation/native';
interface ProductItem {
  id: string;
  title: string;
  price: number | null;
  quantity: number;
  image: string;
  brandName: string;
  size: string;
}

const Userhome: React.FC<{navigation: any}> = ({navigation}) => {
  const [data, setData] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const loadFromAsyncStorage = async () => {
    try {
      const storedData: any = await AsyncStorage.getItem('ListItems');
      const parsedData: ProductItem[] = storedData
        ? JSON.parse(storedData)
        : [];
      setData(parsedData);
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  const handleAddToCart = (item: any) => {
    if (item.price !== null) {
      const existingCartItem = cartItems.find(
        cartItem => cartItem.id === item.id,
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        setCartItems(prevCartItems => [
          ...prevCartItems,
          {
            id: item.id,
            brandName: item.brandName,
            price: item.price !== null ? Math.trunc(item.price) : null,
            quantity: 1,
          },
        ]);
      }

      setCount(prevCount => prevCount + 1);
      setTotalAmount(
        prevTotalAmount =>
          prevTotalAmount +
          (item.price !== null ? Math.trunc(item.price) : null || 0),
      );
    }
  };
  const handleShowData = () => {
    AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    AsyncStorage.setItem('totalAmount', JSON.stringify(totalAmount));
    navigation.navigate('Cart');
  };

  const loadFromLocalStorage = async () => {
    try {
      const cartItemsData = await AsyncStorage.getItem('cartItems');
      const totalAmountData = await AsyncStorage.getItem('totalAmount');

      const parsedCartItems = cartItemsData ? JSON.parse(cartItemsData) : [];
      const parsedTotalAmount = totalAmountData
        ? JSON.parse(totalAmountData)
        : 0;

      const itemCount = parsedCartItems.reduce(
        (acc: any, item: {quantity: any}) => acc + item.quantity,
        0,
      );

      setCartItems(parsedCartItems);
      setTotalAmount(parsedTotalAmount);
      setCount(itemCount);
    } catch (error) {
      console.error('Error loading data from local storage:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFromLocalStorage();
    }, []),
  );

  const saveToLocalStorage = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      await AsyncStorage.setItem('totalAmount', JSON.stringify(totalAmount));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [cartItems, totalAmount]);

  const renderElement = ({item}: {item: ProductItem}) => {
    return (
      <View style={styles.card}>
        <Image source={{uri: item.image}} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitleText}>Brand: {item.brandName}</Text>
          <Text style={styles.cardTitleText}>Size: {item.size}</Text>
          <Text style={styles.cardTitleText}>
            Price: ${item.price !== null ? Math.trunc(item.price) : null}
          </Text>
          <TouchableOpacity
            style={styles.addToCartButtonStyle}
            onPress={() => handleAddToCart(item)}>
            <Text style={styles.addToCartStyle}> Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.shopTitle}>Shoes Shop</Text>
      <TouchableOpacity style={styles.cartButton} onPress={handleShowData}>
        <Text>
          {cartItems.length > 0 ? (
            <Text style={styles.cartItemCount}>*{count}</Text>
          ) : null}
        </Text>
        <AntDesign
          name="shoppingcart"
          color="black"
          size={25}
          style={styles.cartButtonIcon}
        />
      </TouchableOpacity>

      <View style={styles.flatlistView}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderElement}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Userhome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistView: {
    marginHorizontal: 1,
    marginVertical: getHeight(2),
  },
  cartButtonIcon: {
    width: getWidth(6),
    height: getHeight(2.4),
  },
  cartButton: {
    width: getWidth(20),
    height: getHeight(4),
    marginLeft: getHeight(44),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  addToCartStyle: {
    fontSize: getFontSize(4.5),
    fontFamily: 'Poppins',
    alignSelf: 'center',
    color: 'white',
  },
  addToCartButtonStyle: {
    backgroundColor: '#ff9e00',
    width: getWidth(40),
    paddingHorizontal: getWidth(5),
    paddingVertical: getHeight(1.2),
    borderRadius: getHeight(1),
    marginVertical: getHeight(1),
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: getHeight(22),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitleText: {
    alignSelf: 'center',
    fontSize: getFontSize(5),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2873f0',
  },
  shopTitle: {
    alignSelf: 'center',
    marginVertical: getHeight(1),
    fontSize: getFontSize(5.5),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fb641b',
  },
  cartItemCount: {
    color: 'red',
    fontSize: 18,
    position: 'absolute',
  },
});
