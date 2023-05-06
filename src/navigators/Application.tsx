import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Home, Map } from '../screens';
import { ApplicationStackParamList } from '../types/navigation';
import { useFlipper } from '@react-navigation/devtools';
import styles from './styles';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
