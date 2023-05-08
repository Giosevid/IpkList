import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const mockUserState = {};

const waitForInjections = () => new Promise(resolve => setImmediate(resolve));

const createWaitForInjections =
  () => () => (next: any) => async (action: any) => {
    const result = await next(action);
    await waitForInjections();
    return result;
  };

const waitForInjectionsMiddleware = createWaitForInjections();
const middlewares = [waitForInjectionsMiddleware];

const mockStore = configureStore(middlewares);

const renderWithProviders = (
  ui: React.ReactElement,
  fakeStore?: any,
  options?: RenderOptions,
) => {
  const store = mockStore(fakeStore || mockUserState);

  const tree = render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </Provider>
    ),
    ...options,
  });

  return { store, ...tree };
};

export { renderWithProviders };
