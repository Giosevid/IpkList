import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from 'IpkList/src/hooks';

const LoadingMap = () => {
  const { Images } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView source={Images.lottie.loadingMap} autoPlay loop />
    </View>
  );
};

export default LoadingMap;
