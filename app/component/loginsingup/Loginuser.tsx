import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {loginImg} from '../../assets';
import {getFontSize, getHeigth, getWidth} from '../../utils/responsiveScale';
import {translate} from '../../config/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LoginadminProps {
  navigation: any;
}

const Loginuser: React.FC<LoginadminProps> = ({
  navigation,
}: LoginadminProps) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });

  const usernameTextInput = (text: string) => {
    setUserName(text);
    setErrors({
      ...errors,
      userName: '',
    });
  };

  const passwordChangeTextInput = (text: string) => {
    setPassword(text);
    setErrors({
      ...errors,
      userName: '',
    });
  };

  const handleLogin = () => {
    if (userName === 'users' && password === '12345') {
      navigation.navigate('Userhome');
    } else {
      let usernameError = '';
      let passwordError = '';

      if (userName !== 'admin') {
        usernameError = 'Invalid username';
      }

      if (password !== '1234') {
        passwordError = 'Invalid password';
      }

      setErrors({
        userName: usernameError,
        password: passwordError,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={loginImg}
        containerStyle={styles.avatarContainer}
      />
      <Text style={styles.deliveryTextStyle}>
        {translate('loginasAdminText')}
      </Text>

      <View style={styles.loginViewStyle}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="call"
            size={30}
            color="#DCDCDD"
            style={styles.iconStyle}
          />
          <TextInput
            maxLength={5}
            placeholder="Username"
            onChangeText={usernameTextInput}
            value={userName}
            style={styles.inputNumberStyle}
          />
        </View>
        <Text style={styles.errorStyle}>{errors.userName}</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={30}
            color="#DCDCDD"
            style={styles.iconStyle}
          />
          <TextInput
            placeholder="Password"
            onChangeText={passwordChangeTextInput}
            value={password}
            secureTextEntry
            maxLength={5}
            style={styles.inputNumberStyle}
          />
        </View>
        <Text style={styles.errorStyle}>{errors.password}</Text>
        <TouchableOpacity
          style={styles.continueButtonStyle}
          onPress={handleLogin}>
          <Text style={styles.continueTextStyle}>
            {translate('continueText')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Loginuser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getHeigth(5),
    alignItems: 'center',
  },
  avatarContainer: {
    paddingTop: getHeigth(1),
    borderWidth: 10,
    backgroundColor: '#dfe2e8',
    borderColor: '#fdf2da',
    height: getHeigth(28),
    width: getWidth(56),
    borderRadius: getHeigth(20),
  },
  deliveryTextStyle: {
    fontFamily: 'Montserrat Alternates',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: getHeigth(3),
    fontSize: getFontSize(4.5),
    marginVertical: getHeigth(2),
    color: '#18161B',
  },
  longestablishedTextStyle: {
    color: '#99959E',
    fontFamily: 'Poppins',
    fontSize: getFontSize(4),
    textTransform: 'capitalize',
    marginHorizontal: getHeigth(5.5),
    lineHeight: getHeigth(3),
    fontWeight: '500',
    textAlign: 'center',
  },
  dotViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEllipseStyle: {
    marginHorizontal: getHeigth(1),
    marginVertical: getHeigth(5),
  },
  loginViewStyle: {
    width: '100%',
    height: '100%',
  },
  loginRegisterText: {
    textAlign: 'center',
    marginVertical: getHeigth(3),
    fontSize: getFontSize(5),
    fontWeight: '700',
    color: '#18161B',
  },
  inputNumberStyle: {
    backgroundColor: 'white',
    paddingHorizontal: getHeigth(3),
    width: '80%',
    paddingVertical: getHeigth(2.5),
    fontWeight: '700',
    color: '#DCDCDD',
    fontSize: getFontSize(4),
    fontFamily: 'Poppins',
  },
  inputContainer: {
    borderRadius: getHeigth(5),
    marginHorizontal: getWidth(5),
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  iconStyle: {
    marginLeft: getHeigth(2),
    marginTop: getHeigth(2),
  },
  continueButtonStyle: {
    backgroundColor: '#F62B2A',
    borderRadius: getHeigth(5),
    marginHorizontal: getWidth(5),
    paddingHorizontal: getHeigth(2),
    paddingVertical: getHeigth(2.5),
    marginVertical: getHeigth(3),
  },
  continueTextStyle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Montserrat Alternates',
    fontSize: getFontSize(4),
  },
  errorStyle: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '600',
    fontFamily: 'Montserrat Alternates',
    fontSize: getFontSize(4),
  },
});
