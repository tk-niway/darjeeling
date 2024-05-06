import type { Metadata } from "next";
import AppHeader from "../_components/appHeader";

export const metadata: Metadata = {
  title: "Darjeeling",
  description: "Welcome to Darjeeling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
