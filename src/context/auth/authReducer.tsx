// src/reducers/authReducer.ts

import { AuthAction, AuthActionType } from "@/context/actions";
import { AuthState } from "@/types";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        expire: action.payload.expire,
        refresh_expire: action.payload.refresh_expire,
      };
    case AuthActionType.REGENERATE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload.newAccessToken,
        refreshToken: action.payload.newRefreshToken,
        expire: action.payload.expire,
        refresh_expire: action.payload.refresh_expire,
      };
    case AuthActionType.LOGOUT_USER:
      return {
        ...state,
        user: null,
        accessToken: "",
        refreshToken: "",
        expire: "",
        refresh_expire: "",
      };
    case AuthActionType.UPDATE_USER_BASIC_INFO:
      return {
        ...state,
        user: {
          ...state.user!,
          ...action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
