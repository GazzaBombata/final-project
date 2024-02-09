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
      state.restaurantId = null;
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
      state.redirectUrl = null;
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
      state.justDate = null;
      state.dateTime = null;
    },
  },
});

const makeUserAdminSlice = createSlice({
  name: 'makeUserAdmin',
  initialState: false,
  reducers: {
    setMakeUserAdmin: (state, action) => action.payload,
    RESET: state => false,
  },
});

const rootReducer = combineReducers({
  restaurant: restaurantSlice.reducer,
  redirect: redirectSlice.reducer,
  date: dateSlice.reducer,
  makeUserAdmin: makeUserAdminSlice.reducer,
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
export const { setMakeUserAdmin } = makeUserAdminSlice.actions;

export const persistor = persistStore(store);
export default store;