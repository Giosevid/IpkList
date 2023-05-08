import React, { useTransition } from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Detail } from '../screens';
import { useTheme } from '../hooks';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';
import ErrorComponent from '../screens/Error';
import { navigationRef } from './RootNavigation';
import OrderRegisteredError from '../screens/OrderError';
import MapScreen from '../screens/Maps';
import WelcomeScreen from '../screens/Welcome';
import { customHeader, noHeader } from '../utils';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const { t } = useTranslation(['stores']);

  useFlipper(navigationRef);

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.background }]}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={noHeader}
          />
          <Stack.Screen name="Home" component={Home} options={noHeader} />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={customHeader(t('stores:details'))}
          />
          <Stack.Screen name="Maps" component={MapScreen} options={noHeader} />
          <Stack.Screen
            name="Error"
            component={ErrorComponent}
            options={noHeader}
          />
          <Stack.Screen
            name="OrderError"
            component={OrderRegisteredError}
            options={noHeader}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
