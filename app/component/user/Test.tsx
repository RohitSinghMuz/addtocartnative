import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const Test = () => {
  const [sec, setSec] = useState(0);
  const [isRunning, setisRunning] = useState(false);

  useEffect(() => {
    let Interval: any;
    if (isRunning) {
      Interval = setInterval(() => {
        setSec(sec => sec + 1);
      }, 1000);
    } else {
      clearInterval(Interval);
    }
    return () => clearInterval(Interval);
  }, [isRunning, setisRunning]);

  const handleStart = () => {
    setisRunning(true);
  };

  const handleStop = () => {
    setisRunning(false);
  };

  const handleReset = () => {
    setisRunning(false);
    setSec(0);
  };
  return (
    <View>
      <Text>App {sec}</Text>

      <TouchableOpacity onPress={handleStart}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleStop}>
        <Text>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;
