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
    | "toggle"
    | "toggleDef"
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
    "toggle": "toggleButton",
    "toggleDef": "toggleButtonDef",
};
export default function DefaultButton({
    children,
    type,
    onClick,
    linkTo,
    className,
}: defaultButtonProps) {
    let buttonLayout;

    switch (type) {
        case "default":
        case "primary":
        case "secondary":
        case "link":
        case "outline":
        case "linkPrimary":
            buttonLayout = (
                <button
                    className={
                        "defaultButton " + variants[type ?? "default"] + " "
                    }
                    onClick={onClick}
                >
                    <Link href={`${linkTo}`}>{children}</Link>
                </button>
            )
            break;
        case "toggle":
        case "toggleDef":
            buttonLayout = (
                <button
                    className={
                        "defaultButton " + variants[type ?? "default"] + " "
                    }
                    onClick={onClick}
                >
                    {children}
                </button>
            )
            break;
    }

    return buttonLayout;
}
