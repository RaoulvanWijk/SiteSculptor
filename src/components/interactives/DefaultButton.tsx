// Imports
import React from 'react'
import "@/resources/styling/components/interactives/buttons.scss"

// Define a type for the buttons - default
type ButtonTypes = "default" | "primary" | "secondary" | "link" | undefined;

type defaultButtonProps = {
    buttonName: string;
    type: ButtonTypes;
}
const variants = {
    "default": "defaultButton",
    "primary" : "primaryButton",
    "secondary": "secondaryButton",
    "link": "linkButton"
}
export default function DefaultButton({ buttonName, type } : defaultButtonProps) {
  return (
        <button className={"defaultButton " + (variants[type ?? "default"])}>
            {buttonName}
        </button>
  )
}