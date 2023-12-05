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
import {getFontSize, getHeigth, getWidth} from '../../utils/responsiveScale';

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
  console.log('cartItems----', cartItems);
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

  const handleAddToCart = (item: ProductItem) => {
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
            title: item.title,
            price: item.price !== null ? Math.trunc(item.price) : null,
            quantity: 1,
          },
        ]);
      }

      setCount(prevCount => prevCount + 1);
      setTotalAmount(
        prevTotalAmount =>
          prevTotalAmount + (item.price !== null ? Math.trunc(item.price) : 0),
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

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

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
      <View style={Styles.card}>
        <Image source={{uri: item.image}} style={Styles.cardImage} />
        <View style={Styles.cardContent}>
          <Text style={Styles.cardTitleText}>Brand: {item.brandName}</Text>
          <Text style={Styles.cardTitleText}>Size: {item.size}</Text>
          <Text style={Styles.cardTitleText}>
            Price: ${item.price !== null ? Math.trunc(item.price) : null}
          </Text>
          <TouchableOpacity
            style={Styles.addTocartButtonStyle}
            onPress={() => handleAddToCart(item)}>
            <Text style={Styles.addTocartStyle}> Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.containerStyle}>
      <Text style={Styles.shopTitleStyle}>Shoes Shop</Text>
      <TouchableOpacity style={Styles.buttonStyle} onPress={handleShowData}>
        <Text>
          {cartItems.length > 0 ? (
            <Text
              style={{
                color: 'red',
                fontSize: 18,
                position: 'absolute',
              }}>
              *{count}
            </Text>
          ) : null}
        </Text>
        <AntDesign
          name="shoppingcart"
          color="black"
          size={25}
          style={Styles.buttonTextStyle}
        />
      </TouchableOpacity>

      <View style={Styles.flatlistViewStyle}>
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

const Styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  flatlistViewStyle: {
    marginHorizontal: 1,
    marginVertical: getHeigth(2),
  },
  buttonTextStyle: {
    width: getWidth(6),
    height: getHeigth(2.4),
  },
  buttonStyle: {
    width: getWidth(20),
    height: getHeigth(4),
    marginLeft: getHeigth(44),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  imgStyle: {
    width: getWidth(45.3),
    height: getHeigth(27.8),
    borderTopRightRadius: getHeigth(2),
    borderTopLeftRadius: getHeigth(2),
  },
  ListItemViewStyle: {
    backgroundColor: '',
    margin: getHeigth(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  BrandStyle: {
    fontSize: getFontSize(4.5),
    fontFamily: 'Poppins',
    alignSelf: 'center',
  },
  addTocartStyle: {
    fontSize: getFontSize(4.5),
    fontFamily: 'Poppins',
    alignSelf: 'center',
    color: 'white',
  },
  addTocartButtonStyle: {
    backgroundColor: '#ff9e00',
    width: getWidth(40),
    paddingHorizontal: getWidth(5),
    paddingVertical: getHeigth(1.2),
    borderRadius: getHeigth(1),
    marginVertical: getHeigth(1),
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
    height: getHeigth(22),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: getFontSize(5),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2873f0',
  },
  cardTitleText: {
    alignSelf: 'center',
    fontSize: getFontSize(5),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2873f0',
  },
  shopTitleStyle: {
    alignSelf: 'center',
    marginVertical: getHeigth(1),
    fontSize: getFontSize(5.5),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fb641b',
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
  },
});
