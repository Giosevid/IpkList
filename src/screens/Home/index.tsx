import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { Stores } from '../../types/stores';
import { useGetStoresQuery } from '../../services/module/store';

type ItemProps = {
  item: Stores;
};

const Home = ({ navigation }: any) => {
  const { data: stores, isLoading } = useGetStoresQuery();

  if (isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const handlePress = (item: Stores) => {
    navigation.navigate('Map', { itemid: item.id });
  };

  const renderItem = ({ item }: ItemProps) => (
    <Card>
      <Card.Title title={item.name} />
      <Card.Content>{/* <Text>{item.description}</Text> */}</Card.Content>
      <Card.Actions>
        <Button onPress={() => handlePress(item)}>Ver</Button>
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
