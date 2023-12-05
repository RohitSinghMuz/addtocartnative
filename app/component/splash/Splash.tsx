import {
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {spalshBg, splashCenter, spalshTop, spalshBottom} from '../../assets';
import {getHeight, getWidth} from '../../utils/responsiveScale';

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
        <Image
          source={spalshTop}
          resizeMode="cover"
          style={styles.spalshTopImgStyle}
        />
        <Image
          source={splashCenter}
          resizeMode="cover"
          style={styles.spalshCenterImgStyle}
        />
        <Image
          source={spalshBottom}
          resizeMode="cover"
          style={styles.spalshBottomImgStyle}
        />
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
  },
  spalshTopImgStyle: {
    width: getWidth(100),
  },

  spalshCenterImgStyle: {
    display: 'flex',
    marginTop: getHeight(20),

    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  spalshBottomImgStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
