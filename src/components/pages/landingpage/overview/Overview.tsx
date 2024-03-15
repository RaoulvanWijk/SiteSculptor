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
    const pControls1 = useAnimation();
    const pControls2 = useAnimation();
    const pControls3 = useAnimation();
    const pControls4 = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            pControls1.start({ opacity: 1 });
            await controls1.start({
                width: "100%",
                transition: { duration: 5 },
            });
            controls1.set({ width: "0%" });
            pControls1.set({ opacity: 0 });

            pControls2.start({ opacity: 1 });
            await controls2.start({
                width: "100%",
                transition: { duration: 5 },
            });
            controls2.set({ width: "0%" });
            pControls2.set({ opacity: 0 });

            pControls3.start({ opacity: 1 });
            await controls3.start({
                width: "100%",
                transition: { duration: 5 },
            });
            controls3.set({ width: "0%" });
            pControls3.set({ opacity: 0 });

            pControls4.start({ opacity: 1 });
            await controls4.start({
                width: "100%",
                transition: { duration: 5 },
            });
            controls4.set({ width: "0%" });
            pControls4.set({ opacity: 0 });
        };

        sequence();
        const interval = setInterval(sequence, 20000);
        return () => clearInterval(interval);
    }, [
        controls1,
        controls2,
        controls3,
        controls4,
        pControls1,
        pControls2,
        pControls3,
        pControls4,
    ]);
    return (
        <div className="overview">
            <div className="buttons">
                <OverviewButton
                    animate={controls1}
                    animateP={pControls1}
                    title="Create an account"
                    description="Click the sign up button"
                />
                <OverviewButton
                    animate={controls2}
                    animateP={pControls2}
                    title="Select website"
                    description="Choose what kind of website you want to make"
                />
                <OverviewButton
                    animate={controls3}
                    animateP={pControls3}
                    title="Customize"
                    description="Change your colors, content and more to fit it to your needs"
                />
                <OverviewButton
                    animate={controls4}
                    animateP={pControls4}
                    title="Publish"
                    description="Get your website online for the world to view!"
                />
            </div>
            <OverviewCard />
        </div>
    );
}
