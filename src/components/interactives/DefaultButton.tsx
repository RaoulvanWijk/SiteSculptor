// Imports
import React from 'react'
import Link from 'next/link'
import "@/resources/styling/components/interactives/buttons.scss"

// Define a type for the buttons - default
type ButtonTypes = "default" | "primary" | "secondary" | "link" | "linkPrimary" | undefined;

type defaultButtonProps = {
    buttonName: string;
    type: ButtonTypes;
    onClick?: () => void;
    linkTo?: string;
}
const variants = {
    "default": "defaultButton",
    "primary": "primaryButton",
    "secondary": "secondaryButton",
    "link": "linkButton",
    "linkPrimary": "linkPrimeButton"
}
export default function DefaultButton({ buttonName, type, onClick, linkTo }: defaultButtonProps) {
    let buttonLayout;
    switch (type) {
        case 'default':
        case 'primary':
        case 'secondary':
            buttonLayout = (
                <button className={"defaultButton " + (variants[type ?? "default"])} onClick={onClick}>
                    {buttonName}
                </button>
            );
            break;
        case 'link':
        case 'linkPrimary':
            buttonLayout = (
                <Link className={(variants[type])} href={linkTo ?? ''}>{buttonName}</Link>
            );
            break;
    }


    return buttonLayout;
}