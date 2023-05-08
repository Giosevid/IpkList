import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card as CardPaper, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Lottie from '../Lottie';

const Card = ({ title = '', onPress = () => {}, img = '' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animatable.View animation="fadeInUpBig" style={styles.cardContainer}>
        <CardPaper style={styles.card}>
          <CardPaper.Content>
            <Lottie image={img} customStyles={styles.animation} />
            <Title>{title}</Title>
          </CardPaper.Content>
        </CardPaper>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    elevation: 4,
  },
  animation: {
    width: 100,
    height: 100,
  },
  card: {
    flex: 1,
    width: '90%',
    marginBottom: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
});
