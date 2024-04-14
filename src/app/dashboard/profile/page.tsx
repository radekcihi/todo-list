import { auth } from "@/lib/auth";

export default async function Page() {
    const currentUser = await auth();
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Current User: {currentUser?.user.email}</p>
        </div>
    )
}