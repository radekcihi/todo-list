import { LoginForm } from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await auth()
  if (currentUser) {
    redirect("/dashboard")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
}
