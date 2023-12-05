import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import {spalshBg, otpImage} from '../../assets';
import {getFontSize, getHeight, getWidth} from '../../utils/responsiveScale';
import {translate} from '../../config/i18n';

interface OtpProps {
  navigation: any;
}
const Otp: React.FC<OtpProps> = ({navigation}: OtpProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setResendDisabled] = useState(false);
  const inputRefs: React.RefObject<TextInput>[] = Array(4)
    .fill(0)
    .map(_ => useRef<TextInput>(null));

  useEffect(() => {
    let interval: any;

    if (timer > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isResendDisabled) {
      setResendDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < otp.length - 1) {
      inputRefs[index + 1].current?.focus();
    } else if (value === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    setError('');
  };

  // if (enteredOtp === '1234') {
  //   console.log('OTP Verified Successfully!');
  //   navigation.navigate('Home');
  // } else {
  //   console.log('Incorrect OTP. Please try again.');
  //   setOtp(['', '', '', '']);
  //   inputRefs[0].current?.focus();
  // }

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.trim() === '') {
      setError('Please enter OTP');
      return;
    }
    if (enteredOtp == '1234') {
      navigation.navigate('Home');
      console.log('OTP Verified Successfully!');
    } else {
      setError('invalid OTP. Please try again.');
      return;
    }
  };

  const handleResendOtp = () => {
    setResendDisabled(true);
    setTimer(60);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <StatusBar hidden={true} />
        <ImageBackground
          source={spalshBg}
          resizeMode="cover"
          style={styles.imageBackgroundStyle}>
          <Image source={otpImage} style={styles.otpImageStyle} />
          <Text style={styles.otpVerificationTextStyle}>
            {translate('otpVerificationText')}
          </Text>
          <Text style={styles.entertheotpsenttoTextStyle}>
            {translate('entertheotpsenttoText')}
          </Text>
          <Text style={styles.regNumberStyle}>+91{7935543481}</Text>
          <View style={styles.otpinputStyle}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={value => handleOtpChange(index, value)}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={inputRefs[index]}
                />
              ))}
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <View>
            <View style={styles.optResendViewStyle}>
              <Text style={styles.dontRecTextStyle}>
                {translate('dontRecText')}
              </Text>
              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={isResendDisabled}>
                <Text
                  style={[
                    styles.resendTextStyle,
                    isResendDisabled && {color: 'gray'},
                  ]}>
                  {isResendDisabled
                    ? `Resend in ${timer} sec`
                    : translate('resendText')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.continueButtonStyle}
              onPress={handleVerifyOtp}>
              <Text style={styles.continueTextStyle}>
                {translate('submitText')}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Otp;

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
    textAlign: 'center',
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
  otpImageStyle: {
    display: 'flex',
    marginTop: getHeight(6),
    alignSelf: 'center',
  },
  otpVerificationTextStyle: {
    textAlign: 'center',
    marginVertical: getHeight(3),
    fontFamily: 'MontserratAlternates-ExtraBold',
    fontSize: getFontSize(5),
    fontWeight: '700',
    color: '#18161B',
    lineHeight: getHeight(4),
  },
  entertheotpsenttoTextStyle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: getFontSize(5),
  },
  regNumberStyle: {
    textAlign: 'center',
    marginVertical: getHeight(1),
    fontFamily: 'MontserratAlternates-ExtraBold',
    fontWeight: '700',
    fontSize: getFontSize(5),
    lineHeight: getHeight(4),
    color: '#18161B',
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpInput: {
    width: 60,
    height: 60,
    marginVertical: getHeight(1.5),
    padding: getHeight(0.5),
    borderRadius: getHeight(5),
    backgroundColor: 'white',
    color: 'black',
    fontWeight: '700',
    fontSize: getFontSize(5),
    textAlign: 'center',
    marginHorizontal: 5,
  },
  otpinputStyle: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  continueButtonStyle: {
    backgroundColor: '#F62B2A',
    borderRadius: getHeight(5),
    marginHorizontal: getWidth(5),
    paddingHorizontal: getHeight(2),
    paddingVertical: getHeight(2.5),
    marginVertical: getHeight(3),
  },
  continueTextStyle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Montserrat Alternates',
    fontSize: getFontSize(4),
  },
  optResendViewStyle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dontRecTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: getHeight(0.2),
    fontSize: getFontSize(4),
    color: '#705A2C',
  },
  resendTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: getHeight(0.2),
    fontSize: getFontSize(4),
    color: '#DF201F',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
