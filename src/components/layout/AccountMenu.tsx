import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import LogoutButton from "../auth/LogoutButton"
import { UserIcon } from "lucide-react"
export default async function AccountMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><UserIcon /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard/profile">
                    <DropdownMenuItem>Profile </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>)
}