import { AuthActionType } from "@/context/actions";
import { User } from "@/types";

export const loginUserSuccess = (
  user: User,
  roles: string[],
  access_token: string,
  refresh_token: string,
  expire: string,
  refresh_expire: string,
) => ({
  type: AuthActionType.LOGIN_USER_SUCCESS,
  payload: {
    user,
    roles,
    access_token,
    refresh_token,
    expire,
    refresh_expire,
  },
});

export const regenerateAccessToken = (
  newAccessToken: string,
  newRefreshToken: string,
  expire: string,
  refresh_expire: string,
) => ({
  type: AuthActionType.REGENERATE_ACCESS_TOKEN,
  payload: {
    newAccessToken,
    newRefreshToken,
    expire,
    refresh_expire,
  },
});

export const logoutUserAction = () => ({
  type: AuthActionType.LOGOUT_USER,
});

export const UpdateUserBasicInfoAccount = (value: Partial<User>) => ({
  type: AuthActionType.UPDATE_USER_BASIC_INFO,
  payload: {
    value,
  },
});
