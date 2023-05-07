import { ApplicationScreenProps } from 'IpkList/@types/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Title } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Lottie } from 'IpkList/src/components';
import { useTheme } from 'IpkList/src/hooks';

const Error = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation(['stores']);
  const { Images } = useTheme();

  const onPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Lottie image={Images.lottie.error} customStyles={styles.animation} />
          <Title style={styles.title}>{t('error')}</Title>
          <Button style={styles.button} mode="contained" onPress={onPress}>
            {t('backToHome')}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  card: {
    width: '80%',
    height: '50%',
    borderRadius: 16,
    elevation: 4,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  animation: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
  title: {
    marginTop: 150,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#009387',
  },
});
