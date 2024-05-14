import { createContext, ReactNode, useContext, useState } from "react";
import { endpointGraphql } from "@/utils/consts";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  Observable,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { useAuth0 } from "@auth0/auth0-react";
import { ENV } from "@/utils/consts";

type AuthApolloContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

type AuthApolloProviderOptions = {
  children?: ReactNode;
};

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

            return new Observable((observer) => {
              getAccessTokenSilently({
                authorizationParams: {
                  audience: ENV.AUTH0_IDENTIFIER,
                  scope: ENV.AUTH0_SCOPE,
                },
              })
                .then((token) => {
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
                .catch((error) => {
                  // No refresh or client token available, we force user to login
                  observer.error(`Refresh observable ${error}`);
                });
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

  return (
    <AuthApolloContext.Provider value={{ token, setToken }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthApolloContext.Provider>
  );
};

export const useToken = () => useContext(AuthApolloContext);
