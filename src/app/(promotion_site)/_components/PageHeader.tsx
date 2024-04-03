import React from "react";
import "@/resources/styling/components/landingpage/statics/pageHeader.scss";
import DefaultButton from "@/components/interactives/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type pageHeaderProps = {
    headerName: string;
    children?: string;
};

export default function PageHeader({ headerName, children }: pageHeaderProps) {
    return (
        <div className="pageHeader">
            <div className="left">
                <h1>{headerName}</h1>
                <p>{children}</p>
                <DefaultButton
                    type="primary"
                    linkTo="/"
                    className="defaultButton primaryButton"
                >
                    Get started <ArrowRight />
                </DefaultButton>
            </div>
            <div className="right">
                {/* placeholder image */}
                <Image src="https://placehold.co/400x600.png" alt="hero" />
            </div>
        </div>
    );
}
