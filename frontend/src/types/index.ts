import { ReactNode } from "react";
import { AppState, RedirectLoginOptions } from "@auth0/auth0-react";
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
  token: string | null;
  isSignedIn: boolean;
  isLoading: boolean;
  loginWithRedirect: (options?: RedirectLoginOptions<AppState>) => void;
  signout: () => void;
};

/**
 * Represents the options for the AuthUserProvider component.
 */
export type AuthUserProviderOptions = {
  children?: ReactNode;
  user?: User;
};
