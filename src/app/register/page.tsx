import RegisterForm from "@/components/auth/RegisterForm";


export default async function Page() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <RegisterForm />
        </main>
    );

};
