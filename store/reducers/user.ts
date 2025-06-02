import { remove } from 'lodash';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
};

type ToggleFavType = {
  id: string;
};

interface UserSliceTypes {
  user: any;
  email: string;
  favProducts: any;
  token: any;
  loading: boolean;
  error: any;
}

const initialState = {
  user: {
    name: 'user',
    email: 'user@mail',
    token: null
  },
  favProducts: []
} as UserSliceTypes;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserRequest(state) {
      state.loading = true;
    },
    registerUserSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.token; // Store the token in the state
      state.user = action.payload.user; // Optionally store user data
      state.error = null;
    },
    registerUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Store the error message
    },
    toggleFavProduct(state, action: PayloadAction<ToggleFavType>) {
      const index = state.favProducts.includes(action.payload.id);

      if (!index) {
        state.favProducts.push(action.payload.id);

        return;
      }

      remove(state.favProducts, (id) => id === action.payload.id);
    },
    setUserLogged(state, action: PayloadAction<ProductType>) {
      const index = state.favProducts.includes(action.payload.id);

      if (!index) {
        state.favProducts.push(action.payload.id);

        return {
          ...state,
          favProducts: state.favProducts
        };
      }

      remove(state.favProducts, (id) => id === action.payload.id);

      return {
        ...state,
        favProducts: state.favProducts
      };
    },
    logOut(state) {
      state.user = {};
      state.token = null;
      state.user.token = null;
    }
  }
});

export const {
  toggleFavProduct,
  setUserLogged,
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  logOut
} = userSlice.actions;
export default userSlice.reducer;
