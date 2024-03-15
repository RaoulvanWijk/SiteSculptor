"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function OverviewButton({
    animate,
    animateP,
    title,
    description,
}: {
    animate: any;
    animateP: any;
    title: string;
    description: string;
}) {
    console.log(animate);
    return (
        <Link href="/" className="overview-button">
            <h2>{title}</h2>
            <motion.p animate={animateP} style={{ opacity: 0 }}>
                {description}
            </motion.p>
            <motion.div
                className="loading-line"
                animate={animate}
                style={{ width: "0%", height: "5px", borderRadius: "5px" }}
            ></motion.div>
        </Link>
    );
}
