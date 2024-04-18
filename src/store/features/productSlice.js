import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    burgers: [],
    drinks: [],
    fries: [],
    pizzas: [],
    sandwiches: [],
    order: [],
    categories: [],
  },
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    getBurgers: (state, action) => {
      state.burgers = action.payload;
    },
    getFries: (state, action) => {
      state.fries = action.payload;
    },
    getDrinks: (state, action) => {
      state.drinks = action.payload;
    },
    getPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
    getSandwiches: (state, action) => {
      state.sandwiches = action.payload;
    },
  },
});

export const {
  getCategories,
  getBurgers,
  getDrinks,
  getFries,
  getPizzas,
  getSandwiches,
} = productSlice.actions;
export default productSlice.reducer;
