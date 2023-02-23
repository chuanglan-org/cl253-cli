import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./slice/slice_system";
import { useDispatch, useSelector, Provider } from "react-redux";
export const store = configureStore({
  reducer: {
    system: systemReducer,
  },
});

/* ========== 封装一下两个方法方便调用一个文件,方便一起引用 ========== */
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const AppProvider = Provider;
