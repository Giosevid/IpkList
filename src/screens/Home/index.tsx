import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useGetStoresQuery } from '../../services/api';
import { Stores } from 'IpkList/src/types/stores';

type ItemProps = {
  item: Stores;
};

const Home = () => {
  const { data: stores, isLoading } = useGetStoresQuery('');

  console.log('isLoading', isLoading);

  console.log('stores', stores);

  if (isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: ItemProps) => (
    <Card>
      <Card.Title title={item.name} />
      <Card.Content>{/* <Text>{item.description}</Text> */}</Card.Content>
      <Card.Actions>
        <Button>Ver</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <FlatList
      data={stores}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default Home;
