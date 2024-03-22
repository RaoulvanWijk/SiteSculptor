import React from "react";
import { ArrowLeftSquare } from "lucide-react";
import useSideNav from "@/components/hooks/useSideNav";

export default function BackButton() {
    const { setCurrentNavName, setNavType } = useSideNav();

    const backFunction = () => {
        setCurrentNavName("main");
        setNavType("main");
    };

    return (
        <button className="back-button" onClick={backFunction}>
            <ArrowLeftSquare />
        </button>
    );
}
