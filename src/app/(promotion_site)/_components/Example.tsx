"use client";
import React, { useRef } from "react";
import "@/resources/styling/components/landingpage/statics/example.scss";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Example() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale: scaleProgress }}
            className="example"
        ></motion.div>
    );
}
