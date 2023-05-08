import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useGetStoresQuery } from 'IpkList/src/services/modules/storesList';
import { Store } from 'IpkList/src/types/stores';
import { ApplicationScreenProps } from 'IpkList/@types/navigation';
import { Card } from 'IpkList/src/components';
import { useTheme } from 'IpkList/src/hooks';

type Props = {
  item: Store;
};

const FIVE_SECONDS = 5000;

const Home = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation(['stores']);

  const { data: stores } = useGetStoresQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: FIVE_SECONDS,
  });

  const { Images } = useTheme();

  const handlePress = (item: Store) => {
    navigation.navigate('Detail', { storeId: item.id });
  };

  const renderItem = ({ item }: Props) => (
    <Card
      title={item.name}
      onPress={() => handlePress(item)}
      img={Images.lottie.store}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('stores:title')}</Text>
      <FlatList data={stores} renderItem={renderItem} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
    paddingHorizontal: 16,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});
