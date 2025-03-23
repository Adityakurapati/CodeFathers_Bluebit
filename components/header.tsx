"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
        const [menuOpen, setMenuOpen] = useState(false);
        const [bellActive, setBellActive] = useState(false);
        const [userActive, setUserActive] = useState(false);

        const navLinkVariants = {
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        };

        const mobileMenuVariants = {
                hidden: { opacity: 0, x: "-100%" },
                visible: { opacity: 1, x: "0%", transition: { duration: 0.4, type: "spring", stiffness: 100 } },
                exit: { opacity: 0, x: "-100%", transition: { duration: 0.3 } },
        };

        const iconButtonVariants = {
                rest: { scale: 1 },
                hover: { scale: 1.1 },
                tap: { scale: 0.9 },
        };

        return (
                <>
                        <header className="bg-gradient-to-r from-slate-900 to-slate-800 absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 md:p-6 py-2 shadow-md">
                                <Link
                                        href="/"
                                        className="flex items-center gap-2 text-2xl font-bold text-white md:text-3xl"
                                >
                                        <motion.span
                                                className="text-red-500"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                        >
                                                ●
                                        </motion.span>
                                        DisasterResponse
                                </Link>

                                <div className="hidden items-center gap-6 md:flex">
                                        <nav className="flex items-center gap-4">
                                                <motion.div variants={navLinkVariants} initial="hidden" animate="visible">
                                                        <Link href="/" className="text-sm font-medium text-white hover:text-blue-400 transition-colors duration-300">
                                                                Map
                                                        </Link>
                                                </motion.div>
                                                <motion.div variants={navLinkVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                                                        <Link href="/dashboard" className="text-sm font-medium text-white hover:text-blue-400 transition-colors duration-300">
                                                                Dashboard
                                                        </Link>
                                                </motion.div>
                                                <motion.div variants={navLinkVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                                                        <Link href="/emergency" className="text-sm font-medium text-white hover:text-blue-400 transition-colors duration-300">
                                                                Emergency
                                                        </Link>
                                                </motion.div>
                                                <motion.div variants={navLinkVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                                                        <Link href="/resources" className="text-sm font-medium text-white hover:text-blue-400 transition-colors duration-300">
                                                                Resources
                                                        </Link>
                                                </motion.div>
                                                <motion.div variants={navLinkVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                                                        <Link href="/communication" className="text-sm font-medium text-white hover:text-blue-400 transition-colors duration-300">
                                                                Communication
                                                        </Link>
                                                </motion.div>
                                        </nav>

                                        <div className="flex items-center gap-2">
                                                <motion.button
                                                        variants={iconButtonVariants}
                                                        initial="rest"
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white transition-colors duration-300 ${bellActive ? 'bg-blue-600' : 'bg-slate-700'}`}
                                                        onClick={() => setBellActive(!bellActive)}
                                                >
                                                        <Bell className="h-5 w-5" />
                                                </motion.button>
                                                <motion.button
                                                        variants={iconButtonVariants}
                                                        initial="rest"
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white transition-colors duration-300 ${userActive ? 'bg-green-600' : 'bg-slate-700'}`}
                                                        onClick={() => setUserActive(!userActive)}
                                                >
                                                        <User className="h-5 w-5" />
                                                </motion.button>
                                        </div>
                                </div>

                                <motion.button
                                        variants={iconButtonVariants}
                                        initial="rest"
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-600 md:hidden"
                                        onClick={() => setMenuOpen(true)}
                                >
                                        <Menu className="h-5 w-5" />
                                </motion.button>
                        </header>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                                {menuOpen && (
                                        <motion.div
                                                variants={mobileMenuVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="fixed inset-0 z-50 bg-slate-900 bg-opacity-95 md:hidden"
                                        >
                                                <div className="flex h-full flex-col p-4">
                                                        <div className="flex items-center justify-between">
                                                                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                                                                        <span className="text-red-500">●</span>
                                                                        DisasterResponse
                                                                </Link>
                                                                <button
                                                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-600"
                                                                        onClick={() => setMenuOpen(false)}
                                                                >
                                                                        <X className="h-5 w-5" />
                                                                </button>
                                                        </div>

                                                        <nav className="mt-8 flex flex-col gap-4">
                                                                <Link href="/" className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800" onClick={() => setMenuOpen(false)}>Map</Link>
                                                                <Link href="/dashboard" className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                                                <Link href="/emergency" className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800" onClick={() => setMenuOpen(false)}>Emergency</Link>
                                                                <Link href="/resources" className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800" onClick={() => setMenuOpen(false)}>Resources</Link>
                                                                <Link href="/communication" className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800" onClick={() => setMenuOpen(false)}>Communication</Link>
                                                                <Link href="/profile" className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800" onClick={() => setMenuOpen(false)}>Profile</Link>
                                                        </nav>

                                                        <div className="mt-auto">
                                                                <button className="w-full rounded-lg bg-red-600 p-3 text-lg font-bold text-white hover:bg-red-700">Emergency SOS</button>
                                                        </div>
                                                </div>
                                        </motion.div>
                                )}
                        </AnimatePresence>
                </>
        );
}