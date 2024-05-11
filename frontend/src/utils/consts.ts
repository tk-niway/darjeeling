export const ENV: { [key: string]: string } = Object.freeze({
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || "development",
  FRONTEND_HOST: process.env.NEXT_PUBLIC_FRONTEND_HOST || "localhost",
  FRONTEND_PORT: process.env.NEXT_PUBLIC_FRONTEND_PORT || "80",
  BACKEND_HOST: process.env.NEXT_PUBLIC_BACKEND_HOST || "localhost",
  BACKEND_PORT: process.env.NEXT_PUBLIC_BACKEND_PORT || "3333",
  AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "example.com",
  AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "example",
  AUTH0_IDENTIFIER: process.env.NEXT_PUBLIC_AUTH0_IDENTIFIER || "example.com",
  AUTH0_SCOPE: process.env.NEXT_PUBLIC_AUTH0_SCOPE || "openid profile email",
});

const endpoint: string =
  ENV.APP_ENV === "production"
    ? `https://${ENV.BACKEND_HOST}:${ENV.BACKEND_PORT}`
    : `http://${ENV.BACKEND_HOST}:${ENV.BACKEND_PORT}`;
const endpointGraphqlSuffix: string = "graphql";
export const endpointGraphql: string = `${endpoint}/${endpointGraphqlSuffix}`;

export const frontendUrl =
  ENV.APP_ENV === "production"
    ? `https://${ENV.FRONTEND_HOST}:${ENV.FRONTEND_PORT}`
    : `http://${ENV.FRONTEND_HOST}:${ENV.FRONTEND_PORT}`;
