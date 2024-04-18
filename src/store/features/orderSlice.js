import {createSlice} from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    type: '',
    orders: [],
    total_price: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const {meal, drink} = action.payload;
      const existingOrderIndex = state.orders.findIndex(
        order => order.meal.id === meal.id && order.drink.id === drink.id,
      );

      if (existingOrderIndex !== -1) {
        // If the combination exists, increase the quantity
        state.orders[existingOrderIndex].quantity += 1;
      } else {
        // If the combination doesn't exist, add it as a new order with quantity 1
        state.orders.push({meal, drink, quantity: 1});
      }
    },
    diningStyle: (state, action) => {
      state.type = action.payload;
    },
    incrementQuantity: (state, action) => {
      const {meal, drink} = action.payload;
      const orderToUpdate = state.orders.find(
        order => order.meal.id === meal.id && order.drink.id === drink.id,
      );

      if (orderToUpdate) {
        orderToUpdate.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const {meal, drink} = action.payload;
      const orderToUpdateIndex = state.orders.findIndex(
        order => order.meal.id === meal.id && order.drink.id === drink.id,
      );

      if (orderToUpdateIndex !== -1) {
        const orderToUpdate = state.orders[orderToUpdateIndex];
        if (orderToUpdate.quantity === 1) {
          // If quantity is 1, remove the item from the cart
          state.orders.splice(orderToUpdateIndex, 1);
        } else {
          // If quantity is greater than 1, decrement the quantity
          orderToUpdate.quantity -= 1;
        }
      }
    },
    removeItem: (state, action) => {
      const {meal, drink} = action.payload;
      console.log('Removing item:', meal, drink);
      state.orders = state.orders.filter(
        order => !(order.meal.id === meal.id && order.drink.id === drink.id),
      );
      console.log('Updated orders:', state.orders);
    },
    clearOrder: state => {
      state.type = '';
      state.orders = [];
      state.total_price = 0;
    },
    calculatePrice: state => {
      const total_price = state.orders.reduce((total, order) => {
        const mealPrice = order.meal && order.meal.price !== undefined ? order.meal.price : 0;
        const drinkPrice = order.drink && order.drink.price !== undefined ? order.drink.price : 0;
        const subtotal = (mealPrice + drinkPrice) * order.quantity;
        return total + subtotal;
      }, 0);
    

      state.total_price = total_price;
    },
  },
});

export const {
  addToCart,
  diningStyle,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearOrder,
  calculatePrice,
} = orderSlice.actions;
export default orderSlice.reducer;
