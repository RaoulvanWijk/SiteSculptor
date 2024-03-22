import React from "react";
import { ArrowLeftSquare } from "lucide-react";
import useSideNav from "@/components/hooks/useSideNav";

export default function BackButton() {
    const { currentNavName, setCurrentNavName, setNavType, navType } =
        useSideNav();

    const backFunction = () => {
        // find out what the previous nav name was
        const previousNavName = () => {
            if (currentNavName.length > 1) {
                return currentNavName.slice(0, -1);
            } else {
                return [];
            }
        };

        // find out what the previous nav type was
        const previousNavType = () => {
            if (navType == "page-component") {
                return "page-select";
            } else if (navType == "page-select") {
                return "main";
            } else {
                return "main";
            }
        };

        // set the previous nav name and type
        setCurrentNavName(previousNavName());
        setNavType(previousNavType());
    };

    return (
        <button className="back-button" onClick={backFunction}>
            <ArrowLeftSquare />
        </button>
    );
}
