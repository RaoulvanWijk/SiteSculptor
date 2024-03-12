import React from "react";
import DefaultButton from "../../../interactives/Button";
import Image from "next/image";
import "@/resources/styling/components/statics/infoCards.scss";

type CardTypes = "dark" | "light";

type cardProps = {
    type: CardTypes;
    header?: string;
    children?: string;
    imgSrc?: string;
};

const variants = {
    "dark": "darkCard",
    "light": "lightCard",
};

function InfoCard({ header, children, type, imgSrc }: cardProps) {
    let cardContent;

    switch (type) {
        case "dark":
            cardContent = (
                <div className={"defaultCard " + variants[type ?? "default"]}>
                    <h3>{header}</h3>
                    <p>{children}</p>
                </div>
            );
            break;
        case "light":
            cardContent = (
                <div className={"defaultCard " + variants[type ?? "default"]}>
                    <h3 className="imageHeader">{header}</h3>
                    <p>{children}</p>
                </div>
            );
            break;

        default:
            cardContent = (
                <div className="defaultCard">
                    <h3>{header}</h3>
                    <p>{children}</p>
                </div>
            );
    }

    return cardContent;
}

export default InfoCard;
