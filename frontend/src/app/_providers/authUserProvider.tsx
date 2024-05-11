import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";
import { useToken } from "@/app/_providers/authApolloProvider";
import { useApolloClient, gql } from "@apollo/client";
import { ENV } from "@/utils/consts";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthUser = {
  auth0Id: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
};

type AuthUserContextType = {
  authUser: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthUser: (authUser: AuthUser) => void;
  loginWithRedirect: () => void;
  signout: () => void;
  getAccessTokenSilently: {
    (
      options: GetTokenSilentlyOptions & { detailedResponse: true }
    ): Promise<GetTokenSilentlyVerboseResponse>;
    (options?: GetTokenSilentlyOptions): Promise<string>;
    (options: GetTokenSilentlyOptions): Promise<
      GetTokenSilentlyVerboseResponse | string
    >;
  };
  hasToken: boolean;
};

type AuthUserProviderOptions = {
  children?: ReactNode;
};

export const AuthUserContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType
);

export const AuthUserProvider = ({
  children,
}: AuthUserProviderOptions): JSX.Element => {
  const [authUser, setAuthUser] = useState<AuthUser>({} as AuthUser);
  const { token, setToken } = useToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const client = useApolloClient();
  const {
    loginWithRedirect,
    logout,
    isAuthenticated: hasToken,
    getAccessTokenSilently,
  } = useAuth0();
  // const { getAccessTokenWithPopup } = useAuth0(); // For Dev 初回認証時はgetAccessTokenSilentlyの変わりにこれを使う

  useEffect(() => {
    const getAuthUser = async () => {
      setIsLoading(true);
      // TODO バックエンドに登録状況を問い合わせる
      const result = await client.query({ query: querySignin });
      console.log("result", result);

      // TODO 新規の場合はモーダルを表示して登録を促す

      // TODO 登録済みの場合はユーザー情報を表示

      // TODO isActiveがfalseの場合はアカウント停止状態を表示

      setIsAuthenticated(true);
      setAuthUser(result.data.signin);
      setIsLoading(false);
    };

    if (token) getAuthUser();
  }, [token]);

  useEffect(() => {
    console.log("ログイン状態", hasToken);
    const getToken = async () => {
      console.log("ログインしました");
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: ENV.AUTH0_IDENTIFIER,
            scope: ENV.AUTH0_SCOPE,
          },
        });
        console.log({ accessToken });

        setToken(accessToken);
      } catch (e) {
        console.log(e);
      }
    };

    if (hasToken) getToken();
  }, [hasToken]);

  const signout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setAuthUser({} as AuthUser);
    logout();
  };

  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        isAuthenticated,
        isLoading,
        setAuthUser,
        loginWithRedirect,
        signout,
        getAccessTokenSilently,
        hasToken,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthUserContext);

const querySignin = gql`
  query Signin {
    signin {
      auth0Id
      createdAt
      email
      id
      name
      updatedAt
    }
  }
`;
