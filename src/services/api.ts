import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import * as navigation from '../navigators/RootNavigation';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    navigation.navigate('OrderError');
    return result;
  }

  if (result.error && result.error.status !== 200) {
    navigation.navigate('Error');
    return result;
  }
  return result;
};

export const apiStore = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
