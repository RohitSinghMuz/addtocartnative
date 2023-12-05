import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'react-native-elements';
import {loginImg} from '../../assets';
import {getFontSize, getHeight, getWidth} from '../../utils/responsiveScale';
import {translate} from '../../config/i18n';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SplashProps {
  navigation: any;
}

const Login: React.FC<SplashProps> = ({navigation}: SplashProps) => {
  const [number, setNumber] = useState<string>('');

  const [errors, setErrors] = useState({
    number: '',
  });

  const numberChangeTextInput = (number: string) => {
    setNumber(number);

    if (/^[6-9]/.test(number)) {
      if (number.length >= 10) {
        setErrors({
          ...errors,
          number: '',
        });
      } else {
        setErrors({
          ...errors,
          number: 'number length should be 10 digits.',
        });
      }
    } else {
      setErrors({
        ...errors,
        number: 'number start from between 6 and 9 ',
      });
    }
  };

  const handleNavigation = async () => {
    navigation.navigate('Otp');
  };
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={loginImg}
        containerStyle={styles.avatarContainer}
      />

      <View style={styles.loginViewStyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Loginadmin')}
          style={styles.loginasUserTextStyle}>
          <Text style={styles.continueTextStyle}>
            {translate('loginasAdminText')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Loginuser')}
          style={styles.loginasUserTextStyle}>
          <Text style={styles.continueTextStyle}>
            {translate('loginasUserText')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getHeight(15),
    alignItems: 'center',
  },
  avatarContainer: {
    paddingTop: getHeight(1),
    borderWidth: 10,
    backgroundColor: '#dfe2e8',
    borderColor: '#fdf2da',
    height: getHeight(28),
    width: getWidth(56),
    borderRadius: getHeight(20),
  },

  loginViewStyle: {
    width: '100%',
    height: '100%',
  },

  loginasUserTextStyle: {
    backgroundColor: '#F62B2A',
    borderRadius: getHeight(5),
    marginHorizontal: getWidth(15),
    paddingHorizontal: getHeight(2),
    paddingVertical: getHeight(2.5),
    marginTop: getHeight(3),
  },
  continueTextStyle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Montserrat Alternates',
    fontSize: getFontSize(4),
  },
});
