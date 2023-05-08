import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Navigation } from '@interfaces/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootScreen, RootStackParamList } from '@navigation/paramList';

const navigatorMock = {
  state: {
    key: 'key',
    index: 0,
    routeName: 'route',
    routes: [],
    isTransitioning: false,
  },
  dispatch: jest.fn(),
  goBack: jest.fn(),
  canGoBack: jest.fn().mockReturnValue(true),
  dismiss: jest.fn(),
  getParam: jest.fn().mockReturnValue(true),
  navigate: jest.fn(),
  addListener: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  isFirstRouteInParent: jest.fn().mockReturnValue(false),
  emit: jest.fn(),
  isFocused: jest.fn().mockReturnValue(true),
  removeListener: jest.fn(),
};

export const navigationMocked = {
  ...navigatorMock,
  push: jest.fn().mockReturnValue(true),
  pop: jest.fn().mockReturnValue(true),
  reset: jest.fn().mockReturnValue(true),
  replace: jest.fn().mockReturnValue(true),
  popToTop: jest.fn().mockReturnValue(true),
};

const getNavigationMock = <
  RouteName extends RootScreen,
>(): NativeStackNavigationProp<RootStackParamList, RouteName> =>
  navigationMocked;

export const navigationPropsMocked = <RouteName extends RootScreen>(
  params?: RootStackParamList[RouteName],
): Navigation<RootStackParamList, RouteName> => ({
  navigation: getNavigationMock(),
  route: {
    key: '',
    name: '',
    params,
  } as unknown as Navigation<RootStackParamList, RouteName>['route'],
});

export const tabNavigationMock: NavigationHelpers<
  ParamListBase,
  BottomTabNavigationEventMap
> = {
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn().mockReturnValue(true),
  canGoBack: jest.fn().mockReturnValue(true),
  getParent: jest.fn(),
  getState: jest.fn(),
  navigate: jest.fn(),
  setParams: jest.fn(),
  emit: jest.fn(),
  isFocused: jest.fn().mockReturnValue(true),
};

type Routes = BottomTabBarProps['state']['routes'];

export const getNavigationTabBarMocked = (
  routes: Routes,
): BottomTabBarProps => {
  let index = 0;
  return {
    state: {
      index,
      routes,
      key: 'key',
      history: [],
      routeNames: [],
      type: 'tab',
      stale: false,
    },
    insets: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    descriptors: {},
    navigation: {
      ...tabNavigationMock,
      emit: jest.fn().mockImplementation(({ target }: { target: string }) => {
        const defaultPrevented = target === routes[index].key;
        if (!defaultPrevented) {
          index = routes.findIndex(route => route.key === target);
        }
        return { defaultPrevented };
      }),
    },
  };
};
