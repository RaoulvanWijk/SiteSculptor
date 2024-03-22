import React from "react";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";
import useSideNav from "@/components/hooks/useSideNav";
import BackButton from "./buttons/BackButton";

export default function BreadCrumbs() {
    const { currentNavName, setCurrentNavName } = useSideNav();

    const currentNav = currentNavName;

    const breadCrumpsText = () => {
        if (currentNav.length === 0) return "";

        return currentNav.map((nav, index) => {
            return (
                <button key={index}>
                    <p>{">"}</p>
                    <p className="breadcrumb">{nav.toLowerCase()}</p>
                </button>
            );
        });
    };

    return (
        <div className="breadcrumbs">
            {currentNav.length > 0 && <BackButton />}
            <p>pages</p>
            {breadCrumpsText()}
        </div>
    );
}
