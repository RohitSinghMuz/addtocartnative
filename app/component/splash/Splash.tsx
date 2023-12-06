import {
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import React, {useEffect} from 'react';
import {spalshBg, splashCenter, spalshTop, spalshBottom} from '../../assets';
import {getFontSize, getHeight, getWidth} from '../../utils/responsiveScale';

interface SplashProps {
  navigation: any;
}

const Splash: React.FC<SplashProps> = ({navigation}: SplashProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={spalshBg}
        resizeMode="cover"
        style={styles.imageBackgroundStyle}>
        <Text style={styles.shoeshopStyle}>Shoes Shop</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
  imageBackgroundStyle: {
    width: getWidth(100),
    height: getHeight(100),
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  spalshTopImgStyle: {
    width: getWidth(100),
  },
  shoeshopStyle: {
    fontSize: getFontSize(9),
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: 'white',
  },
});
