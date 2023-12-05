import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {getFontSize, getHeigth, getWidth} from '../../utils/responsiveScale';
import {
  profileImg,
  splashCenter,
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  bestOne,
  bestTwo,
  bestThree,
  bestFour,
  bestFive,
} from '../../assets';
import {Avatar} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {translate} from '../../config/i18n';

const bestPrData = [
  {
    title: 'Country Eggs Pack',
    price: '₹173.00',
    crossPrice: ' 200.00',
    image: '',
  },
  {
    title: 'Tandoori Chicken..',
    price: '₹143.00',
    crossPrice: '173.00',
    image: bestTwo,
  },
  {
    title: 'Sea Food',
    price: '₹249.00',
    crossPrice: ' 149.00',
    image: bestThree,
  },
  {
    title: 'BBQ Corner',
    price: '₹570.00',
    crossPrice: ' 470.00',
    image: bestFour,
  },
  {
    title: 'Grill House',
    price: '₹473.00',
    crossPrice: ' 400.00',
    image: bestFive,
  },
];

const Home = ({navigation}: any) => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const myInputRef: any = useRef(null);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const focusInput = () => {
    if (myInputRef.current) {
      myInputRef.current.focus();
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleImagePress = (index: number) => {
    setCurrentImage(index);
  };

  const images = [imgTwo, imgOne, imgThree, imgFour];

  const renderElement = ({item}: any) => {
    return (
      <View style={Styles.bestSellerProductViewStyle}>
        <Image style={Styles.imageBestStyle} source={bestTwo} />
        <Text style={Styles.titleBestStyle}>{item.title}</Text>
        <View style={Styles.priceViewStyle}>
          <Text style={Styles.priceStyle}>{item.price}</Text>
          <Text style={Styles.crossPriceStyle}>{item.crossPrice}</Text>
        </View>
        <View style={Styles.qunitityViewStyle}>
          <Feather
            style={Styles.menuStyle}
            name="minus"
            color={'#FFFFFF'}
            size={25}
            onPress={decrementCount}
          />
          <Text style={Styles.countStyle}>{count}</Text>
          <Feather
            style={Styles.menuStyle}
            name="plus"
            color={'#FFFFFF'}
            size={25}
            onPress={incrementCount}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={Styles.headerViewStyle}>
        <View style={Styles.menuViewStyle}>
          <Entypo
            style={Styles.menuStyle}
            name="list"
            color={'white'}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View>
          <Image
            source={splashCenter}
            resizeMode="cover"
            style={Styles.spalshCenterImgStyle}
          />
        </View>
        <View>
          <Avatar rounded size="medium" source={profileImg} />
        </View>
      </View>

      <View style={Styles.searchPincodeViewStyle}>
        <View style={Styles.searchViewStyle} onTouchEnd={focusInput}>
          <MaterialIcons
            style={Styles.menuStyle}
            name="search"
            color={'#A4A1A1'}
            size={40}
          />
          <TextInput
            ref={myInputRef}
            onChangeText={input => setSearch(input)}
            style={Styles.searchTextStyle}
            placeholder="Search..."
          />
        </View>
        <View style={Styles.pincodeViewStyle}>
          <Entypo
            style={Styles.locationIconsStyle}
            name="location-pin"
            color={'#A4A1A1'}
            size={30}
          />
          <Text style={Styles.pincodeValueStyle}>500042</Text>
        </View>
      </View>
      <View style={Styles.container}>
        <TouchableOpacity
          onPress={() => handleImagePress(currentImage)}
          style={Styles.imageBtnStyle}>
          <Image
            source={images[(currentImage - 1 + images.length) % images.length]}
            style={[Styles.prevImage]}
          />
          <Image source={images[currentImage]} style={[Styles.currentImage]} />
          <Image
            source={images[(currentImage + 1) % images.length]}
            style={[Styles.nextImage]}
          />
        </TouchableOpacity>
        <View style={Styles.bulletContainer}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(index)}
              style={[
                Styles.bullet,
                currentImage === index && Styles.activeBullet,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={Styles.bestSellerViewStyle}>
        <Text style={Styles.bestSellerStyle}>
          {translate('bestSellersText')}
        </Text>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={bestPrData}
          renderItem={renderElement}
          keyExtractor={item => item.price}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const Styles = StyleSheet.create({
  menuStyle: {
    padding: getHeigth(1),
  },
  menuViewStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    width: getWidth(15),
    height: getWidth(15),
    padding: getHeigth(1),
    borderRadius: getHeigth(10),
    backgroundColor: '#e7ac28',
  },
  spalshCenterImgStyle: {
    width: getWidth(36),
    resizeMode: 'contain',
    height: getHeigth(6),
  },
  headerViewStyle: {
    backgroundColor: '#F5BF45',
    paddingVertical: getHeigth(3),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: getWidth(65),
    height: getHeigth(9),
    paddingHorizontal: getHeigth(1.5),
    paddingVertical: getHeigth(1),
  },
  searchTextStyle: {
    fontSize: getFontSize(5.5),
    fontFamily: 'Poppins-Bold',
    color: '#A4A1A1',
  },
  searchPincodeViewStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  pincodeViewStyle: {
    borderLeftWidth: getHeigth(0.03),
    borderColor: '#A4A1A1',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: getWidth(35),
    height: getHeigth(9),
    paddingHorizontal: getHeigth(0.1),
    paddingVertical: getHeigth(1),
  },
  pincodeValueStyle: {
    paddingVertical: getHeigth(1.4),
    fontSize: getFontSize(5),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  locationIconsStyle: {
    paddingVertical: getHeigth(1.4),
    paddingHorizontal: getHeigth(0.8),
  },
  container: {
    width: getWidth(100),
    height: getHeigth(25),
    backgroundColor: '#C4C4C4',
  },
  imageBtnStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  currentImage: {
    width: getWidth(82),
    height: getHeigth(20),
    margin: getHeigth(1),
    borderRadius: getHeigth(1),
    resizeMode: 'cover',
  },

  bulletContainer: {
    position: 'absolute',
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: getHeigth(18),
    marginHorizontal: getHeigth(20),
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  activeBullet: {
    backgroundColor: '#F5BF45',
  },
  prevImage: {
    width: getWidth(10),
    height: getHeigth(20),
    marginVertical: getHeigth(1),
    borderRadius: getHeigth(1),
    resizeMode: 'cover',
  },
  nextImage: {
    width: getWidth(8),
    height: getHeigth(20),
    borderRadius: getHeigth(1),
    marginVertical: getHeigth(1),
    resizeMode: 'cover',
  },
  bestSellerViewStyle: {
    margin: getHeigth(1),
  },
  bestSellerStyle: {
    fontSize: getFontSize(4),
    fontFamily: 'MontserratAlternates-SemiBold',
    fontWeight: '700',
    color: '#18161B',
  },
  bestSellerProductViewStyle: {
    margin: getHeigth(1),
  },
  priceViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: getHeigth(1),
  },
  imageBestStyle: {
    width: getWidth(40),
    height: getHeigth(12),
    borderRadius: getHeigth(1),
  },
  titleBestStyle: {
    fontSize: getFontSize(3.5),
    margin: getHeigth(1),
    alignSelf: 'flex-start',
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  priceStyle: {
    color: '#F62B2A',
    fontSize: getFontSize(3.5),
    marginHorizontal: getHeigth(1),
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  crossPriceStyle: {
    color: '#BAB9BB',
    fontSize: getFontSize(3.5),
    fontFamily: 'MontserratAlternates-SemiBold',
    textDecorationLine: 'line-through',
  },
  qunitityViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getHeigth(0.8),
    backgroundColor: '#F5BF45',
    borderRadius: getHeigth(5),
    marginVertical: getHeigth(1),
  },
  countStyle: {
    fontSize: getFontSize(4.5),
    color: '#000000',
    fontFamily: 'MontserratAlternates-SemiBold',
    fontWeight: '700',
    alignSelf: 'center',
    paddingTop: getHeigth(1),
    borderLeftWidth: getHeigth(0.08),
    paddingHorizontal: getHeigth(2),
    borderRightWidth: getHeigth(0.08),
    borderColor: '#FFFFFF',
    height: getHeigth(5),
  },
});
