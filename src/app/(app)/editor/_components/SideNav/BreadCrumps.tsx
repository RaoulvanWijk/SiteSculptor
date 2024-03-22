import React from "react";
import "@/resources/styling/components/SideNav/navigator.scss";
import useSideNav from "@/components/hooks/useSideNav";
import BackButton from "./buttons/BackButton";

export default function Navigator() {
    const { currentNavName, setCurrentNavName } = useSideNav();

    const currentNav = currentNavName;

    let text;

    if (currentNav == "main") {
        text = "";
    } else {
        text = ` > ${currentNav}`;
    }

    return (
        <div className="navigator">
            {currentNav != "main" && <BackButton />}
            pages{text}
        </div>
    );
}
