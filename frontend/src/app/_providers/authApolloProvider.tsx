import { createContext, useContext, useMemo, useState } from "react";
import { endpointGraphql } from "@/utils/consts";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NextLink,
  Observable,
  Operation,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { ENV } from "@/utils/consts";
import { AuthApolloContextType, AuthApolloProviderOptions } from "@/types";

export const AuthApolloContext = createContext<AuthApolloContextType>(
  {} as AuthApolloContextType
);

export const AuthApolloProvider = ({
  children,
}: AuthApolloProviderOptions): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  const retryLink = new RetryLink();

  const httpLink = new HttpLink({
    uri: endpointGraphql,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const { message, locations, path } of graphQLErrors) {
          // Handle token expiration
          if (message.includes("TokenExpiredError")) {
            // Code to handle token expiration
            console.info("TokenExpiredError and refreshing token...");

            return observableAccessToken({
              getAccessTokenSilently,
              setToken,
              operation,
              forward,
            });
          }

          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        }
      }

      if (networkError) console.error(`[Network error]: ${networkError}`);
    }
  );

  const client = new ApolloClient({
    link: from([retryLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });

  const contextValue = useMemo<AuthApolloContextType>(() => {
    return {
      token,
      setToken,
    };
  }, [token]);

  return (
    <AuthApolloContext.Provider value={contextValue}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthApolloContext.Provider>
  );
};

export const useToken = () => useContext(AuthApolloContext);

function observableAccessToken({
  getAccessTokenSilently,
  setToken,
  operation,
  forward,
}: {
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions | undefined
  ) => Promise<string>;
  setToken: AuthApolloContextType["setToken"];
  operation: Operation;
  forward: NextLink;
}): Observable<any> {
  return new Observable((observer) => {
    getAccessTokenSilently({
      authorizationParams: {
        audience: ENV.AUTH0_IDENTIFIER,
        scope: ENV.AUTH0_SCOPE,
      },
    })
      .then((token: any) => {
        setToken(token);

        operation.setContext(({ headers = {} }) => ({
          headers: {
            // Re-add old headers
            ...headers,
            // Switch out old access token for new one
            authorization: token ? `Bearer ${token}` : null,
          },
        }));
      })
      .then(() => {
        const subscriber = {
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        };

        // Retry last failed request
        forward(operation).subscribe(subscriber);
      })
      .catch((error: any) => {
        // No refresh or client token available, we force user to login
        observer.error(`Refresh observable ${error}`);
      });
  });
}
