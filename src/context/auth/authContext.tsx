"use client";

import React, { useReducer, useContext, ReactNode, createContext } from "react";
import { AuthState, User } from "@/types";
import authReducer from "@/context/auth/authReducer";
import { AuthActionType } from "@/context/actions";

interface AuthContextProps extends AuthState {
  regenerateTokens: (
    newAccessToken: string,
    newRefreshToken: string,
    expire: string,
    refresh_expire: string,
  ) => void;
  logoutUser: () => void;
  setLoginUserSuccess: (
    user: User,
    access_token: string,
    refresh_token: string,
    expire: string,
    refresh_expire: string,
  ) => Promise<void>;
  addUserToLocalStorage: (
    user: User,
    token: string,
    expire: string,
    refresh: string,
    refresh_expire: string,
  ) => void;
  updateUserBasicInfo: (value: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const authInitialState: AuthState = {
  isLoading: false,
  user: null,
  accessToken: "",
  refreshToken: "",
  expire: "",
  refresh_expire: "",
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  React.useEffect(() => {
    const token = localStorage.getItem("pc_token");
    const expire = localStorage.getItem("pc_token_expire");
    const refresh = localStorage.getItem("pc_refresh");
    const refresh_expire = localStorage.getItem("pc_refresh_expire");
    const user = localStorage.getItem("pc_user");

    if (user && token && expire && refresh && refresh_expire) {
      dispatch({
        type: AuthActionType.LOGIN_USER_SUCCESS,
        payload: {
          user: JSON.parse(user),
          access_token: JSON.parse(token),
          refresh_token: JSON.parse(refresh),
          expire: JSON.parse(expire),
          refresh_expire: JSON.parse(refresh_expire),
        },
      });
    }
  }, []);

  const addUserToLocalStorage = (
    user: User,
    token: string,
    expire: string,
    refresh: string,
    refresh_expire: string,
  ) => {
    localStorage.setItem("pc_user", JSON.stringify(user));
    localStorage.setItem("pc_token", JSON.stringify(token));
    localStorage.setItem("pc_token_expire", JSON.stringify(expire));
    localStorage.setItem("pc_refresh_expire", JSON.stringify(refresh_expire));
    localStorage.setItem("pc_refresh", JSON.stringify(refresh));
  };

  const updateTokensStorage = (
    token: string,
    refresh: string,
    expire: string,
    refresh_expire: string,
  ) => {
    localStorage.setItem("pc_token", JSON.stringify(token));
    localStorage.setItem("pc_token_expire", JSON.stringify(expire));
    localStorage.setItem("pc_refresh", JSON.stringify(refresh));
    localStorage.setItem("pc_refresh_expire", JSON.stringify(refresh_expire));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("pc_user");
    localStorage.removeItem("pc_token");
    localStorage.removeItem("pc_token_expire");
    localStorage.removeItem("pc_refresh_expire");
    localStorage.removeItem("pc_refresh");
    localStorage.removeItem("pc_settings");
  };

  // Function to update user basic information
  const updateUserBasicInfo = (value: Partial<User>) => {
    dispatch({
      type: AuthActionType.UPDATE_USER_BASIC_INFO,
      payload: {
        value,
      },
    });
    const currentUserData = localStorage.getItem("pc_user");
    if (currentUserData) {
      const parsedUser = JSON.parse(currentUserData);
      const updatedUserData = {
        ...parsedUser,
        ...value,
      };
      localStorage.setItem("pc_user", JSON.stringify(updatedUserData));
    }
  };

  const setLoginUserSuccess = async (
    user: User,
    access_token: string,
    refresh_token: string,
    expire: string,
    refresh_expire: string,
  ) => {
    dispatch({
      type: AuthActionType.LOGIN_USER_SUCCESS,
      payload: {
        user,
        access_token,
        refresh_token,
        expire,
        refresh_expire,
      },
    });

    addUserToLocalStorage(
      user,
      access_token,
      expire,
      refresh_token,
      refresh_expire,
    );
  };

  const regenerateTokens = (
    newAccessToken: string,
    newRefreshToken: string,
    expire: string,
    refresh_expire: string,
  ) => {
    dispatch({
      type: AuthActionType.REGENERATE_ACCESS_TOKEN,
      payload: { newAccessToken, newRefreshToken, expire, refresh_expire },
    });
    updateTokensStorage(
      newAccessToken,
      newRefreshToken,
      expire,
      refresh_expire,
    );
  };

  const logoutUser = async () => {
    dispatch({ type: AuthActionType.LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        regenerateTokens,
        logoutUser,
        setLoginUserSuccess,
        addUserToLocalStorage,
        updateUserBasicInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
