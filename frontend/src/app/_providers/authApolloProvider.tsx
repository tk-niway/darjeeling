import { createContext, ReactNode, useContext, useState } from "react";
import { endpointGraphql } from "@/utils/consts";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

type AuthApolloContextType = {
  token: string | null;
  setToken: (token: string|null) => void;
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
  const [token, setToken] = useState<string | null>(null);

  const authLink = setContext((_, { headers }) => {
    console.log("token auth+ink", token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: endpointGraphql })),
    cache: new InMemoryCache(),
  });

  return (
    <AuthApolloContext.Provider value={{ token, setToken }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthApolloContext.Provider>
  );
};

export const useToken = () => useContext(AuthApolloContext);
