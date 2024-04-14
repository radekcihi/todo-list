import Link from "next/link";
import { auth } from "@/lib/auth";
import { CheckCircleIcon } from "lucide-react";
import AccountMenu from "./AccountMenu";

export default async function Navbar() {
    return (

        <header className="flex h-16 flex-row justify-between items-center px-6  border-b border-gray-200">
            <Link className="flex items-center gap-2 font-semibold " href="/dashboard">
                <CheckCircleIcon className="h-6 w-6" />
                <span> Todo&apos;s</span>
            </Link>
            <AccountMenu />
        </header>


    );
}