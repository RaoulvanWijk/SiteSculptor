import Button from "@/components/interactives/Button";
import React from "react";
import "@/resources/styling/components/statics/bottomCTO.scss";

export default function BottomCTO() {
    return (
        <div className="bottomcto">
            <h1>Designed for Flexibility and Ease of use</h1>
            <p>
                Explore the boudless horizons of your imagination; the the
                journey begins with a single step. Welcome to a space where
                dreams materialize and online wonders come alive.
            </p>
            <Button type="primary">Get started</Button>
        </div>
    );
}
