"use client";
import React, { useEffect, useRef, useState } from "react";
import "@/resources/styling/components/landingpage/statics/overview.scss";
import OverviewCard from "./components/OverviewCard";
import OverviewButton from "./components/OverviewButton";
import { animate, useAnimationControls } from "framer-motion";
import { set } from "zod";

export default function Overview() {
    const [mounted, setMounted] = useState(false);
    const firstRender = useRef(true);
    let controls1 = useAnimationControls();
    let controls2 = useAnimationControls();
    let controls3 = useAnimationControls();
    let controls4 = useAnimationControls();
    let pControls1 = useAnimationControls();
    let pControls2 = useAnimationControls();
    let pControls3 = useAnimationControls();
    let pControls4 = useAnimationControls();

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
    });

    useEffect(() => {
        // check if controls are defined

        const sequence = async () => {
            if (firstRender.current) {
                pControls1.start({ opacity: 1 });
                await controls1
                    .start({
                        width: "100%",
                        transition: { duration: 5 },
                    })
                    .then(() => {
                        controls1.set({ width: "0%" });
                        pControls1.set({ opacity: 0 });
                    });

                pControls2.start({ opacity: 1 });
                await controls2
                    .start({
                        width: "100%",
                        transition: { duration: 5 },
                    })
                    .then(() => {
                        controls2.set({ width: "0%" });
                        pControls2.set({ opacity: 0 });
                    });

                pControls3.start({ opacity: 1 });
                await controls3
                    .start({
                        width: "100%",
                        transition: { duration: 5 },
                    })
                    .then(() => {
                        controls3.set({ width: "0%" });
                        pControls3.set({ opacity: 0 });
                    });

                pControls4.start({ opacity: 1 });
                await controls4
                    .start({
                        width: "100%",
                        transition: { duration: 5 },
                    })
                    .then(() => {
                        controls4.set({ width: "0%" });
                        pControls4.set({ opacity: 0 });
                    });
            }
        };

        sequence();
        const interval = setInterval(sequence, 20000);
        return () => {
            clearInterval(interval);
            // clear all controls
            controls1.stop();
            controls2.stop();
            controls3.stop();
            controls4.stop();
            pControls1.stop();
            pControls2.stop();
            pControls3.stop();
            pControls4.stop();
        };
    }, [
        controls1,
        controls2,
        controls3,
        controls4,
        pControls1,
        pControls2,
        pControls3,
        pControls4,
        mounted,
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
