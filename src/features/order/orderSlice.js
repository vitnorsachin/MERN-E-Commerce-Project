import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  orderStatus: "idle", // specific flag for order success
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.orderStatus = "idle";  // here i reset order status value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
        state.orderStatus = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderStatus = "success";
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.status = "failed";
        state.orderStatus = "failed";
      });
  },
});

export const { increment } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectOrderStatus = (state) => state.order.orderStatus;
export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;