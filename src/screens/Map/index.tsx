import { useGetStoreByIdQuery } from 'IpkList/src/services/module/store';
import React from 'react';
import { Text, View } from 'react-native';

export type MapProps = {};

const Map = ({ route }: any) => {
  const { itemId } = route.params;

  return (
    <View>
      <Text>Map</Text>
    </View>
  );
};

export default Map;
