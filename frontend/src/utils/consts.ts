export const ENV: { [key: string]: string } = Object.freeze({
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || "development",
  BACKEND_HOST: process.env.NEXT_PUBLIC_BACKEND_HOST || "localhost",
  BACKEND_PORT: process.env.NEXT_PUBLIC_BACKEND_PORT || "3333",
  AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "example.com",
  AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "example",
  AUTH0_IDENTIFIER: process.env.NEXT_PUBLIC_AUTH0_IDENTIFIER || "example.com",
  AUTH0_SCOPE: process.env.NEXT_PUBLIC_AUTH0_SCOPE || "openid profile email",
});

export const ENDPOINT: string =
  ENV.APP_ENV === "production"
    ? `https://${ENV.BACKEND_HOST}:${ENV.BACKEND_PORT}`
    : `http://${ENV.BACKEND_HOST}:${ENV.BACKEND_PORT}`;
export const ENDPOINT_GRAPHQL_SUFFIX: string = "graphql";
export const ENDPOINT_GRAPHQL: string = `${ENDPOINT}/${ENDPOINT_GRAPHQL_SUFFIX}`;
