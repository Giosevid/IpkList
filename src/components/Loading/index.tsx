import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from 'IpkList/src/hooks';

const LoadingMap = () => {
  const { Images } = useTheme();
  return (
    <View style={styles.container}>
      <LottieView source={Images.lottie.loadingMap} autoPlay loop />
    </View>
  );
};

export default LoadingMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
