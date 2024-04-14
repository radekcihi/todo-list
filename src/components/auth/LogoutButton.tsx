"use client"
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutButton() {

    return (
        <span className="cursor-pointer w-full"  onClick={() => {
            signOut()
        }}>
            Logout
        </span >)
}