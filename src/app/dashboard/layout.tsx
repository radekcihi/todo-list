import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";




export default async function DashboardLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <main className="">
            <div className=" flex flex-col justify-center w-full ">
                {modal}
                <Navbar />
                <section className="bg-gray-100/40 h-[calc(100vh-64px)] p-4">
                    <div className="flex flex-col items-center gap-1">
                        <Link className="w-full" href="/dashboard/create">
                            <Button className="w-full" variant={"outline"} >

                                Create a new todo

                            </Button>
                        </Link>
                    </div>
                    {children}
                </section>
            </div>

        </main>
    );
}
