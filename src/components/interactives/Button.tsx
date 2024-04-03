// Imports
import React from "react";
import Link from "next/link";
import "@/resources/styling/components/interactives/buttons.scss";

// Define a type for the buttons - default
type ButtonTypes =
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "link"
    | "linkPrimary"
    | undefined;

type defaultButtonProps = {
    children: React.ReactNode;
    type: ButtonTypes;
    onClick?: () => void;
    linkTo?: string;
    className?: string;
};
const variants = {
    "default": "defaultButton",
    "primary": "primaryButton",
    "secondary": "secondaryButton",
    "link": "linkButton",
    "outline": "outlineButton",
    "linkPrimary": "linkPrimeButton",
};
export default function Button({
    children,
    type,
    onClick,
    linkTo,
    className,
}: defaultButtonProps) {
    return (
        <button
            className={
                "defaultButton " + variants[type ?? "default"] + " " + className
            }
            onClick={onClick}
        >
            <Link href={`${linkTo}`}>{children}</Link>
        </button>
    );
}
