import { User } from "@/types";

export enum AuthActionType {
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGOUT_USER = "LOGOUT_USER",
  REGENERATE_ACCESS_TOKEN = "REGENERATE_ACCESS_TOKEN",
  UPDATE_USER_BASIC_INFO = "UPDATE_USER_BASIC_INFO",
  SET_STORAGE_LOADING = "SET_STORAGE_LOADING",
  SET_INITIAL_STATE = "SET_INITIAL_STATE",
}

interface LoginUserSuccessPayload {
  user: User;
  access_token: string;
  refresh_token: string;
  expire: string;
  refresh_expire: string;
}

interface RegenerateAccessTokenPayload {
  newAccessToken: string;
  newRefreshToken: string;
  expire: string;
  refresh_expire: string;
}

interface UpdateUserBasicInfoPayload {
  value: Partial<User>;
}

// src/context/actions/index.ts

export type AuthAction =
  | {
      type: AuthActionType.LOGIN_USER_SUCCESS;
      payload: LoginUserSuccessPayload;
    }
  | {
      type: AuthActionType.REGENERATE_ACCESS_TOKEN;
      payload: RegenerateAccessTokenPayload;
    }
  | {
      type: AuthActionType.LOGOUT_USER;
    }
  | {
      type: AuthActionType.UPDATE_USER_BASIC_INFO;
      payload: UpdateUserBasicInfoPayload;
    };

interface LoginUserSuccessPayload {
  user: User;
  access_token: string;
  refresh_token: string;
  expire: string;
  refresh_expire: string;
}

interface RegenerateAccessTokenPayload {
  newAccessToken: string;
  newRefreshToken: string;
  expire: string;
  refresh_expire: string;
}

interface UpdateUserBasicInfoPayload {
  value: Partial<User>;
}

export interface UpdateUserBasicInfoAction {
  type: AuthActionType.UPDATE_USER_BASIC_INFO;
  payload: {
    value: Partial<User>;
  };
}
