"use client";
// import "./globals.css";
import { Inter } from "next/font/google";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { ChakraProviders } from "@/app/_providers/chakraProviders";


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
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
          authorizationParams={{
            redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL!}/login`,
          }}
        >
          <ChakraProviders>{children}</ChakraProviders>
        </Auth0Provider>
      </body>
    </html>
  );
}
