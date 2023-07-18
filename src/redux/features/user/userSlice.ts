import User from "@/types/User";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: User;
  error: string;
  loading: boolean;
}

const initialState: UserState = {
  user: {} as User,
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    userLogin: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.loading = false;
      state.error = "";
    },
    userFailure: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },
    userLogout: (state) => {
      state.user = {} as User;
      state.error = "";
      state.loading = false;
    },
  },
});

export const { userLoading, userLogin, userFailure, userLogout } =
  userSlice.actions;

export default userSlice.reducer;
