"use client"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDebounceCallback } from "usehooks-ts"
import { Input } from "../ui/input"

export default function SearchBar({ placeholder }: Readonly<{ placeholder: string }>) {
    const searchParam = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleChange = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = new URLSearchParams(searchParam)
        if (e.target.value) {
            query.set("query", e.target.value)
        } else {
            query.delete("query")
        }
        replace(`${pathname}?${query.toString()}`);
    }, 800)

    return (
        <Input
            className="w-full bg-white "
            placeholder={placeholder}
            type="search"
            onChange={handleChange}
            defaultValue={searchParam.get('query')?.toString()}
        />)
}