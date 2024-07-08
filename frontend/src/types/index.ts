import { ReactNode } from "react";
import { AppState, RedirectLoginOptions } from "@auth0/auth0-react";
import {
  GetTokenSilentlyOptions,
  GetTokenSilentlyVerboseResponse,
} from "@auth0/auth0-spa-js";
import { User } from "@/types/generated/graphqlTypes";

export * from "@/types/generated/graphqlTypes";

export type AuthApolloContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export type AuthApolloProviderOptions = {
  children?: ReactNode;
};

/**
 * Represents the shape of the authentication user context.
 */
export type AuthUserContextType = {
  authUser: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthUser: (authUser: User) => void;
  loginWithRedirect: (options?: RedirectLoginOptions<AppState>) => void;
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
  token: string | null;
  hasToken: boolean;
};

/**
 * Represents the options for the AuthUserProvider component.
 */
export type AuthUserProviderOptions = {
  children?: ReactNode;
  user?: User
};
