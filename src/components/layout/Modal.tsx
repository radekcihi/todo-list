'use client'

import { cloneElement, createContext, Fragment, useState } from 'react'

import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const handleClose = () => router.back()
    const [open, setOpen] = useState(true)
    return (
        <div>
            <Dialog open={open} onOpenChange={(state) => {
                if (!state) {
                    handleClose()
                }
            }} >
                <DialogContent className='w-72'>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    )
}