// simple responsive navbar with a logo and a hamburger menu using tailwind
// and a dropdown menu
"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { MinusIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function NavbarOne() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-between p-4 bg-slate-300 text-white rounded-lg">
            <div className="flex items-center space-x-4">
                <Image
                    width={40}
                    height={40}
                    src={
                        session
                            ? session.user.image || "/logo.svg"
                            : "/logo.svg"
                    }
                    alt="logo"
                    className="w-10 h-10 rounded-full"
                />
                <h1 className="text-xl font-bold">
                    {session ? `Welcome, ${session.user.name}` : "Welcome"}
                </h1>
            </div>
            <div className="md:hidden">
                <button onClick={() => setIsOpen(true)}>
                    <MinusIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="hidden md:flex space-x-4">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 z-10"
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 space-y-4">
                        <button onClick={() => setIsOpen(false)}>
                            <MinusIcon className="w-6 h-6" />
                        </button>
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Services</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
