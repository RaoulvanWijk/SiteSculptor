import React from "react";
import "@/resources/styling/components/statics/pageHeader.scss";
import DefaultButton from "@/components/interactives/Button";
import { ArrowRight } from "lucide-react";

type pageHeaderProps = {
    headerName: string;
    children?: string;
};

export default function PageHeader({ headerName, children }: pageHeaderProps) {
    return (
        <div className="pageHeader">
            <h1>{headerName}</h1>
            <p>{children}</p>
            <DefaultButton
                type="primary"
                linkTo="/"
                className="getstarted-button"
            >
                Get started <ArrowRight />
            </DefaultButton>
        </div>
    );
}
