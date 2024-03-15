"use client";
import React, { useEffect } from "react";
import "@/resources/styling/components/landingpage/statics/overview.scss";
import OverviewCard from "./components/OverviewCard";
import OverviewButton from "./components/OverviewButton";
import { animate, useAnimation } from "framer-motion";

export default function Overview() {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await controls1.start({
                width: "100%",
                transition: { duration: 10 },
            });
            controls1.set({ width: "0%" });
            await controls2.start({
                width: "100%",
                transition: { duration: 10 },
            });
            controls2.set({ width: "0%" });
            await controls3.start({
                width: "100%",
                transition: { duration: 10 },
            });
            controls3.set({ width: "0%" });
            await controls4.start({
                width: "100%",
                transition: { duration: 10 },
            });
            controls4.set({ width: "0%" });
        };

        sequence();
        const interval = setInterval(sequence, 40000);
        return () => clearInterval(interval);
    }, [controls1, controls2, controls3, controls4]);
    return (
        <div className="overview">
            <div className="buttons">
                <OverviewButton animate={controls1} />
                <OverviewButton animate={controls2} />
                <OverviewButton animate={controls3} />
                <OverviewButton animate={controls4} />
            </div>
            <OverviewCard />
        </div>
    );
}
