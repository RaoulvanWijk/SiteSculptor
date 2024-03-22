import React from "react";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";
import useSideNav from "@/components/hooks/useSideNav";
import BackButton from "./buttons/BackButton";

export default function BreadCrumbs() {
    const { currentNavName } = useSideNav();

    const currentNav = currentNavName;

    const breadCrumpsText = () => {
        if (currentNav[0] === "Footer" || currentNav[0] === "Navbar") {
            return <p>{currentNav[0]}</p>;
        }

        if (currentNav.length >= 0) {
            console.log(currentNav);

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
