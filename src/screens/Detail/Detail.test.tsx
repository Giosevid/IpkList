import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Detail from './index';
import { storesListApi } from '../../services/modules/storesList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const ReduxProvider = ({ children, reduxStore }: any) => (
  <Provider store={reduxStore}>{children}</Provider>
);

jest.mock('react-native-animatable', () => 'react-native-animatable');

it('test_set_check_in_successfully_navigates_to_maps_screen', () => {
  const store = configureStore();

  const wrapper = ({ children }: any) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );

  const { result } = renderHook(
    () => {
      useSaveAuthenticationDataToStorages(useDispatch());
    },
    { wrapper },
  );
  // Arrange
  const navigation = { navigate: jest.fn() };
  const route = { params: { storeId: '1' } };
  const { getByTestId } = render(
    <Detail navigation={navigation} route={route} />,
  );
  storesListApi.endpoints.getStores.useQuery.mockReturnValueOnce({
    data: [{ id: '1', tasks: [] }],
  });
  storesListApi.endpoints.setCheckIn.useMutation.mockReturnValueOnce([
    jest.fn(),
    { isSuccess: true },
  ]);

  // Act
  fireEvent.press(getByTestId('task-card'));

  // Assert
  expect(navigation.navigate).toHaveBeenCalledWith('Maps', { storeId: '1' });
});
