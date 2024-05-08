import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ENDPOINT_GRAPHQL } from "@/utils/consts";

class ApolloClientSingleton {
  // インスタンス化を禁止するため、privateコンストラクタを使用
  private constructor() {}

  private static instance: ApolloClient<any> | null = null;

  public static getInstance(): ApolloClient<any> {
    if (!ApolloClientSingleton.instance) {
      ApolloClientSingleton.instance = new ApolloClient({
        uri: ENDPOINT_GRAPHQL,
        cache: new InMemoryCache(),
      });
    }

    return ApolloClientSingleton.instance;
  }
}

export const apolloClient = ApolloClientSingleton.getInstance();
