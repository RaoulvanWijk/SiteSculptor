"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function OverviewButton({ animate }: { animate: any }) {
    return (
        <Link href="/" className="overview-button">
            <h2>Title</h2>
            <p>description</p>
            <motion.div
                className="loading-line"
                animate={animate}
                transition={{ duration: 10 }}
                style={{ width: "0%", height: "5px" }}
            ></motion.div>
        </Link>
    );
}
