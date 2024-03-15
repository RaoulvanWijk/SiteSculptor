import React from "react";
import "@/resources/styling/components/landingpage/statics/overview.scss";
import OverviewCard from "./components/OverviewCard";
import OverviewButton from "./components/OverviewButton";

export default function Overview() {
    return (
        <div className="overview">
            <div className="buttons">
                <OverviewButton />
                <OverviewButton />
                <OverviewButton />
                <OverviewButton />
            </div>
            <OverviewCard />
        </div>
    );
}
