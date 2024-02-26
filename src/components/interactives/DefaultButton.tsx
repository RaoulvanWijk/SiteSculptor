// Imports
import React from 'react'
import "@/resources/styling/components/interactives/buttons.scss"

// Define a type for the buttons - default
type ButtonTypes = "default" | "primary" | "secondary" | "link" | undefined;

type defaultButtonProps = {
    buttonName: string;
    type: ButtonTypes;
    onClick?: () => void;
}
const variants = {
    "default": "defaultButton",
    "primary" : "primaryButton",
    "secondary": "secondaryButton",
    "link": "linkButton"
}
export default function DefaultButton({ buttonName, type, onClick } : defaultButtonProps) {
  return (
        <button className={"defaultButton " + (variants[type ?? "default"])} onClick={onClick}>
            {buttonName}
        </button>
  )
}