import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {gyroscope} from 'react-native-sensors';

export default function App() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    const subscription = gyroscope.subscribe(({z}) => {
      rotation.value = z * 10; // Adjust multiplier for sensitivity
    });
    return () => subscription.unsubscribe();
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
});
