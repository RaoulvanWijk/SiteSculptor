import React from "react";
import { ArrowLeftSquare } from "lucide-react";
import useSideNav from "@/components/hooks/useSideNav";
import { useRouter } from "next/navigation";

export default function BackButton() {
    // get the current nav name, set the current nav name, set the nav type, and get the nav type from the useSideNav hook
    const { currentNavName, setCurrentNavName, setNavType, navType, site } =
        useSideNav();

    const route = useRouter();

    // function to go back to the previous nav
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
                route.push(`/editor/${site[0].id}/`);

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
