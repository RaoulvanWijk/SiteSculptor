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
    | "toggleLink"
    | undefined;

type defaultButtonProps = {
    children: React.ReactNode,
    type: ButtonTypes,
    buttonType?: "button" | "submit" | "reset",
    onClick?: () => void,
    linkTo?: string,
    className?: string,
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
    "toggleLink": "toggleButtonLink"
};
export default function DefaultButton({
    children,
    type,
    buttonType,
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
                    type={buttonType}
                    className={
                        "defaultButton " + variants[type ?? "default"] + " "
                    }
                    onClick={onClick}
                >
                    <Link href={linkTo?? "#"}>{children}</Link>
                </button>
            )
            break;
        case "toggle":
        case "toggleDef":
        case "toggleLink":
            buttonLayout = (
                <button
                    type={buttonType}
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
