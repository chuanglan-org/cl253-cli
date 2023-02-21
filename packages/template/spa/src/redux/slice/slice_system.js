import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: {}, // 用户基本信息
  collapsed: false, // 菜单收缩情况
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setUserInfo, setCollapsed } = systemSlice.actions;
export default systemSlice.reducer;
