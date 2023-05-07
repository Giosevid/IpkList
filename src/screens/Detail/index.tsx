import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks';
import { Task } from '../../types/stores';
import {
  storesListApi,
  useSetCheckInMutation,
} from 'IpkList/src/services/modules/storesList';
import { ApplicationScreenProps } from 'IpkList/@types/navigation';
import { useTranslation } from 'react-i18next';
import { Card } from 'IpkList/src/components';

const Detail = ({ route, navigation }: ApplicationScreenProps) => {
  const { storeId } = route.params!!;
  const { t } = useTranslation(['stores']);
  const { data } = useSelector(storesListApi.endpoints.getStores.select());
  const [tasks, setTasks] = useState<Task[]>();
  const [setCheckIn, { isSuccess }] = useSetCheckInMutation();

  if (isSuccess) {
    navigation.navigate('Maps', { storeId });
  }

  const findStoreById = useMemo(
    () => data?.find(item => item.id === storeId),
    [data, storeId],
  );

  useEffect(() => {
    if (data) {
      setTasks(findStoreById?.tasks);
    }
  }, [data, findStoreById]);

  const { Images } = useTheme();

  const selectImage = {
    true: Images.lottie.success,
    false: Images.lottie.bell,
  };
  const handlePress = (item: Task) => {
    const body = {
      storeId: findStoreById?.id!!,
      taskId: item.id,
    };
    setCheckIn(body);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <Card
      title={item.description}
      onPress={() => handlePress(item)}
      img={selectImage[item.assigned]}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('stores:listTask')}</Text>
      <FlatList data={tasks} renderItem={renderItem} />
    </View>
  );
};

export default Detail;

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
