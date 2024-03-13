"use client";
import React from "react";
import "@/resources/styling/components/statics/example.scss";
import { motion, useScroll } from "framer-motion";

export default function Example() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="example"
        ></motion.div>
    );
}
