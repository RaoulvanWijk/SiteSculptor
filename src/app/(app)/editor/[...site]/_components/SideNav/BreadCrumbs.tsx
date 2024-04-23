import React from "react";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";
import useSideNav from "@/components/hooks/useSideNav";
import BackButton from "./buttons/BackButton";

export default function BreadCrumbs() {
    // get the current nav name from the useSideNav hook
    const { currentNavName } = useSideNav();
    // console.log(currentNavName);

    // get the current nav name
    const currentNav = currentNavName;

    // function to create the breadcrumbs text
    const breadCrumpsText = () => {
        // if the current nav is the footer or navbar, return the current nav
        if (currentNav[0] === "Footer" || currentNav[0] === "Navbar") {
            return <p>{currentNav[0]}</p>;
        }

        // if the current nav is the normal render the buttons
        if (currentNav.length >= 0) {
            return (
                <>
                    <p>Pages</p>
                    {currentNav.map((nav, index) => {
                        return (
                            <button key={index}>
                                <p>{">"}</p>
                                <p className="breadcrumb">
                                    {nav.toLowerCase()}
                                </p>
                            </button>
                        );
                    })}
                </>
            );
        }
    };

    return (
        <div className="breadcrumbs">
            {currentNav.length > 0 && <BackButton />}

            {breadCrumpsText()}
        </div>
    );
}
