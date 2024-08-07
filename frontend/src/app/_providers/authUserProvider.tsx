/**
 * @file Provides the AuthUserProvider component and related types for managing user authentication.
 * @module AuthUserProvider
 */

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useApolloClient, gql, ApolloClient } from "@apollo/client";
import { ENV } from "@/utils/consts";
import { useToken } from "@/app/_providers/authApolloProvider";
import {
  UserError,
  AuthUserContextType,
  AuthUserProviderOptions,
  User,
} from "@/types";

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
  user = {} as User,
}: AuthUserProviderOptions): JSX.Element => {
  const [authUser, setAuthUser] = useState<User>(user);
  const { token, setToken } = useToken();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const client = useApolloClient();
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading: auth0IsLoading,
  } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // If user has auth0 token but not signed in, try to sign in user
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
        setIsSignedIn(true);
        setIsLoading(false);
      }
    };

    // user is not authenticated but has token
    if (token && !authUser?.id) _getAuthUser();
  }, [token]);

  // If user is authenticated, get access token
  useEffect(() => {
    const _getToken = async () => {
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

    if (auth0IsLoading) setIsLoading(true);

    if (!auth0IsLoading && isAuthenticated) {
      setIsLoading(true);
      _getToken();
    }

    if (!auth0IsLoading && !isAuthenticated) setIsLoading(false);
  }, [isAuthenticated, auth0IsLoading]);

  /**
   * Signs out the user.
   */
  const signout = useCallback(() => {
    setToken(null);
    setIsSignedIn(false);
    setAuthUser({} as User);
    logout();
  }, [setToken, setIsSignedIn, setAuthUser, logout]);

  const contextValue = useMemo<AuthUserContextType>(() => {
    return {
      authUser,
      isSignedIn,
      isLoading,
      loginWithRedirect,
      signout,
      token,
    };
  }, [authUser, isSignedIn, isLoading, loginWithRedirect, signout, token]);

  return (
    <AuthUserContext.Provider value={contextValue}>
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
 * @returns {Promise<User | undefined>} A promise that resolves to the authenticated user or undefined if the user is not active.
 */
async function signup(client: ApolloClient<object>): Promise<User | undefined> {
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
 * @returns {Promise<User | null | undefined>} A promise that resolves to the authenticated user, null if the user is not found, or undefined if the user is not active.
 */
async function signin(
  client: ApolloClient<object>
): Promise<User | null | undefined> {
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
 * @param {UserError[]} userErrors - The user errors.
 * @returns  {userNotFound: boolean; userNotActive: boolean;} An object containing flags for user not found and user not active errors.
 */
function parseUserErrors(userErrors: UserError[]): {
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
