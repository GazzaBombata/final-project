import { configureStore, createSlice } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: { restaurantId: null },
  reducers: {
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
    },
  },
});

export const { setRestaurantId } = restaurantSlice.actions;

const store = configureStore({
  reducer: restaurantSlice.reducer,
});

export default store;