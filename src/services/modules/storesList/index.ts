import { Store } from 'IpkList/src/types/stores';
import { apiStore } from '../../api';

type CheckInBody = {
  storeId: string;
  taskId: string;
};

export const storesListApi = apiStore.injectEndpoints({
  endpoints: build => ({
    getStores: build.query<Store[], void>({
      query: () => '/stores',
    }),
    setCheckIn: build.mutation<Store, CheckInBody>({
      query: store => ({
        url: '/checkin',
        method: 'POST',
        body: store,
      }),
    }),
    resetStore: build.mutation<null, void>({
      query: () => ({
        url: '/stores/reset',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStoresQuery,
  useSetCheckInMutation,
  useResetStoreMutation,
} = storesListApi;
