/**
 * @file Provides the AuthUserProvider component and related types for managing user authentication.
 * @module AuthUserProvider
 */

import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { useAuth0, AppState, RedirectLoginOptions } from "@auth0/auth0-react";
import {
  GetTokenSilentlyOptions,
  GetTokenSilentlyVerboseResponse,
} from "@auth0/auth0-spa-js";
import { useApolloClient, gql, ApolloClient } from "@apollo/client";
import { ENV } from "@/utils/consts";
import { useToken } from "@/app/_providers/authApolloProvider";

/**
 * Represents the shape of an authenticated user.
 */
type AuthUser = {
  auth0Id: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
};

/**
 * Represents the shape of the authentication user context.
 */
type AuthUserContextType = {
  authUser: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthUser: (authUser: AuthUser) => void;
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
  hasToken: boolean;
};

/**
 * Represents the options for the AuthUserProvider component.
 */
type AuthUserProviderOptions = {
  children?: ReactNode;
};

/**
 * Context for managing the authenticated user.
 */
export const AuthUserContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType
);

/**
 * Provides the AuthUserProvider component for managing user authentication.
 * @param {AuthUserProviderOptions} options - The options for the AuthUserProvider component.
 * @returns {JSX.Element} The AuthUserProvider component.
 */
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

  useEffect(() => {
    const _getAuthUser = async () => {
      setIsLoading(true);

      let result = await signin(client);

      if (result === null) {
        result = await signup(client);
      }

      if (result === undefined) {
        console.info("User is not active");
        // TODO: show toast
        signout();
      }

      if (result) {
        setAuthUser(result);
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    };

    // user is not authenticated but has token
    if (token && !authUser?.id) _getAuthUser();
  }, [token]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: ENV.AUTH0_IDENTIFIER,
            scope: ENV.AUTH0_SCOPE,
          },
        });
        setToken(accessToken);
      } catch (e) {
        console.error(e);
      }
    };

    if (hasToken) getToken();
  }, [hasToken]);

  /**
   * Signs out the user.
   */
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

/**
 * Custom hook for accessing the authenticated user context.
 * @returns {AuthUserContextType} The authenticated user context.
 */
export const useAuthUser = () => useContext(AuthUserContext);

const querySignin = gql`
  query Signin {
    signin {
      user {
        auth0Id
        createdAt
        email
        id
        isActive
        name
        updatedAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const querySignup = gql`
  mutation Signup {
    signup {
      user {
        auth0Id
        createdAt
        email
        id
        isActive
        name
        updatedAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Signs up a user.
 * @param {ApolloClient<object>} client - The Apollo client.
 * @returns {Promise<AuthUser | undefined>} A promise that resolves to the authenticated user or undefined if the user is not active.
 */
async function signup(
  client: ApolloClient<object>
): Promise<AuthUser | undefined> {
  const {
    data: {
      signup: { user, userErrors },
    },
  } = await client.mutate({
    mutation: querySignup,
  });

  if (user) return user;

  const { userNotActive } = parseUserErrors(userErrors);

  if (userNotActive) return undefined;
}

/**
 * Signs in a user.
 * @param {ApolloClient<object>} client - The Apollo client.
 * @returns {Promise<AuthUser | null | undefined>} A promise that resolves to the authenticated user, null if the user is not found, or undefined if the user is not active.
 */
async function signin(
  client: ApolloClient<object>
): Promise<AuthUser | null | undefined> {
  const {
    data: {
      signin: { user, userErrors },
    },
  } = await client.query({
    query: querySignin,
  });

  if (user) return user;

  const { userNotFound, userNotActive } = parseUserErrors(userErrors);

  if (userNotActive) return undefined;

  if (userNotFound) return null;
}

/**
 * Parses user errors.
 * @param {any} userErrors - The user errors.
 * @returns  {userNotFound: boolean; userNotActive: boolean;} An object containing flags for user not found and user not active errors.
 */
function parseUserErrors(userErrors: any): {
  userNotFound: boolean;
  userNotActive: boolean;
} {
  let userNotFound = false;
  let userNotActive = false;

  if (userErrors.length > 0) {
    userErrors.forEach((error: { message: string }) => {
      if (error.message === "User not found") {
        userNotFound = true;
      }

      if (error.message === "User is not active") {
        userNotActive = true;
      }
    });
  }

  return { userNotFound, userNotActive };
}
