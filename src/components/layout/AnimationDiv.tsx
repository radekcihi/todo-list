"use client"
import { motion } from "framer-motion";
export default function AnimationDiv({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            /* make a easing animation */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
}
