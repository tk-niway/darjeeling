"use client";
// import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/theme";
import { frontendUrl } from "@/utils/consts";
import { AuthApolloProvider } from "@/app/_providers/authApolloProvider";
import { AuthUserProvider } from "@/app/_providers/authUserProvider";
import { ENV } from "@/utils/consts";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Auth0Provider
          domain={ENV.AUTH0_DOMAIN}
          clientId={ENV.AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: frontendUrl,
          }}
        >
          <AuthApolloProvider>
            <AuthUserProvider>
              <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
              </AppRouterCacheProvider>
            </AuthUserProvider>
          </AuthApolloProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
