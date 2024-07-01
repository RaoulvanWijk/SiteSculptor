'use client'

import React from 'react'
import Image from 'next/image';
import { useSession } from "next-auth/react";
import "@/resources/styling/components/dashboard/sidebar.scss"

export default function UserOverview() {
    const { data: session } = useSession();

    return (
        <div className="overview-container">
            <div className="user-info">
                <Image src={session?.user.image || "/logo.svg"} alt="user logo" className='um-logo' width={200} height={200} />
                <span className='um-name'>{session?.user.name}</span>
                <span className='um-email'>{session?.user.email}</span>
            </div>
        </div>
    )
}
