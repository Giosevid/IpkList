import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  image: string;
  customStyles?: StyleProp<ViewStyle>;
};

const Lottie = ({ image, customStyles }: Props) => {
  return (
    <View style={styles.container}>
      <LottieView source={image} autoPlay loop style={customStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Lottie;
