import { createSlice } from '@reduxjs/toolkit';
import { Store } from 'IpkList/src/types/stores';

const slice = createSlice({
  name: 'storeSelected',
  initialState: {
    store: {} as Store,
  },
  reducers: {
    setStore: (state, { payload }: StorePayload) => {
      console.log('payload', payload);
      state.store = payload;
    },
  },
});

export const { setStore } = slice.actions;

export default slice.reducer;

type StorePayload = {
  payload: Store;
};
