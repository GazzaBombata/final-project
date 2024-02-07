import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

export const RESET = 'RESET';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: { restaurantId: null },
  reducers: {
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
    },
    [RESET]: (state, action) => {
      return { restaurantId: null };
    },
  },
});

const redirectSlice = createSlice({
  name: 'redirect',
  initialState: { redirectUrl: null },
  reducers: {
    setRedirectUrl: (state, action) => {
      state.redirectUrl = action.payload;
    },
    [RESET]: (state, action) => {
      return { redirectUrl: null };
    },
  },
});

const dateSlice = createSlice({
  name: 'date',
  initialState: { justDate: null, dateTime: null },
  reducers: {
    setDate: (state, action) => {
      if (action.payload.justDate !== undefined) {
        state.justDate = action.payload.justDate;
      }
      if (action.payload.dateTime !== undefined) {
        state.dateTime = action.payload.dateTime;
      }
    },
    [RESET]: (state, action) => {
      return { justDate: null, dateTime: null };
    },
  },
});

const rootReducer = combineReducers({
  restaurant: restaurantSlice.reducer,
  redirect: redirectSlice.reducer,
  date: dateSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});



export const { setRestaurantId } = restaurantSlice.actions;
export const { setRedirectUrl } = redirectSlice.actions;
export const { setDate } = dateSlice.actions;

export const persistor = persistStore(store);
export default store;