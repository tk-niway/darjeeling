"use client";

import { redirect } from "next/navigation";

// This is a page that redirects to the home page.
export default function Page() {
  redirect("/");
}
