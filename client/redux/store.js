import { configureStore } from '@reduxjs/toolkit';

const initialState = { 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  }
};

const store = configureStore({ reducer });

export default store;
