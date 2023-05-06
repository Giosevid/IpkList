import { Stores } from 'IpkList/src/types/stores';
import { api } from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getStores: builder.query<Stores[], void>({
      query: () => '/stores',
    }),
    getStoreById: builder.query<Stores, string>({
      query: id => `/stores/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetStoresQuery, useGetStoreByIdQuery } = userApi;
