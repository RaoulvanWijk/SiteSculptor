import React from 'react'
import DefaultButton from "@/components/interactives/DefaultButton";
import "@/resources/styling/components/interactives/navbar.scss"
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav>
            <div className="navBar">
                <Image 
                    src={"/resources/branding/logo_temp.png"}
                    className='logoImage'
                    height={50}
                    width={100}
                    alt='Logo'
                />
                <div className='navMenu'>
                    <DefaultButton buttonName='Home' type='link' />
                    <DefaultButton buttonName='FAQ' type='link' />
                    <DefaultButton buttonName='Examples' type='link' />
                    <DefaultButton buttonName='Pricing' type='link' />
                    <DefaultButton buttonName='Login/Register' type='primary' />
                </div>
            </div>
        </nav>
    )
}
