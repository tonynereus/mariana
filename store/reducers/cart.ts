import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductStoreType } from 'types';

interface CartTypes {
  cartItems: ProductStoreType[];
}

const initialState = {
  cartItems: []
} as CartTypes;

const indexSameProduct = (state: CartTypes, action: ProductStoreType) => {
  const sameProduct = (product: ProductStoreType) =>
    product.id === action.id && product.color === action.color && product.size === action.size;

  return state.cartItems.findIndex(sameProduct);
};

type AddProductType = {
  product: ProductStoreType;
  count: number;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProductType>) => {
      const cartItems = state.cartItems;

      // find index of product
      const index = indexSameProduct(state, action.payload.product);

      if (index !== -1) {
        cartItems[index].count += action.payload.count;
        return;
      }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.product]
      };
    },
    removeProduct(state, action: PayloadAction<ProductStoreType>) {
      // find index of product
      state.cartItems.splice(indexSameProduct(state, action.payload), 1);
    },

    clearCart(state) {
      state.cartItems = [];
    },

    setCart: (state, action) => {
      state.cartItems = action.payload.product; // Replace instead of adding
    },
    setCount(state, action: PayloadAction<AddProductType>) {
      // find index and add new count on product count
      const indexItem = indexSameProduct(state, action.payload.product);
      state.cartItems[indexItem].count = action.payload.count;
    }
  }
});

export const { addProduct, removeProduct, setCount, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
