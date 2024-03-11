// Imports
import React from "react";
import Link from "next/link";
import "@/resources/styling/components/interactives/buttons.scss";

// Define a type for the buttons - default
type ButtonTypes =
    | "default"
    | "primary"
    | "secondary"
    | "link"
    | "linkPrimary"
    | undefined;

type defaultButtonProps = {
    children: React.ReactNode;
    type: ButtonTypes;
    onClick?: () => void;
    linkTo?: string;
};
const variants = {
    "default": "defaultButton",
    "primary": "primaryButton",
    "secondary": "secondaryButton",
    "link": "linkButton",
    "linkPrimary": "linkPrimeButton",
};
export default function Button({
    children,
    type,
    onClick,
    linkTo,
}: defaultButtonProps) {
    return (
        <button
            className={"defaultButton " + variants[type ?? "default"]}
            onClick={onClick}
        >
            <Link href={`${linkTo}`}>{children}</Link>
        </button>
    );
}
