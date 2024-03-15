"use client";
import React from "react";
import { motion } from "framer-motion";
import "@/resources/styling/components/landingpage/statics/infoCards.scss";
import { LucideIcon } from "lucide-react";

type CardTypes = "dark" | "light";

type cardProps = {
    type: CardTypes;
    icon?: React.ReactNode;
    header?: string;
    children?: React.ReactNode;
    imgSrc?: string;
};

const variants = {
    "dark": "darkCard",
    "light": "lightCard",
};

function InfoCard({ icon, header, children, type }: cardProps) {
    let cardContent;

    switch (type) {
        case "dark":
            cardContent = (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
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
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={"defaultCard " + variants[type ?? "default"]}
                >
                    <motion.div
                        whileHover={{ borderRadius: "25%" }}
                        className="icon"
                    >
                        {icon}
                    </motion.div>
                    <p>{children}</p>
                </motion.div>
            );
            break;

        default:
            cardContent = (
                <div className="defaultCard">
                    <h3>{icon}</h3>
                    <p>{children}</p>
                </div>
            );
    }

    return cardContent;
}

export default InfoCard;
