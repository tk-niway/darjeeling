import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Darjeeling",
  description: "Welcome to Darjeeling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
