"use client";
import { useParams } from "next/navigation";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = useParams<{ userId: string }>();
  const { authUser, isLoading } = useAuthUser();

  useEffect(() => {
    if (isLoading) return;

    if (!userId) redirect("/");

    if (userId !== authUser.id) redirect(`/users/${userId}`);
  }, [isLoading]);

  // TODO: add loading spinner
  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
