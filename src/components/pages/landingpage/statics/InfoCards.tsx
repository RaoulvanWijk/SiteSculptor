"use client";
import React from "react";
import { motion } from "framer-motion";
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
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={"defaultCard " + variants[type ?? "default"]}
                >
                    <h3>{header}</h3>
                    <p>{children}</p>
                </motion.div>
            );
            break;
        case "light":
            cardContent = (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={"defaultCard " + variants[type ?? "default"]}
                >
                    <h3 className="imageHeader">{header}</h3>
                    <p>{children}</p>
                </motion.div>
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
