import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  // TODO: Pasar esto a el .env
  baseUrl: 'https://ikp-mobile-challenge-backend.up.railway.app',
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
