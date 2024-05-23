import Navbar from "./_components/static/Navbar";
import React from "react";

type layoutProps = {
    children: React.ReactNode;
};

export default function layout({ children }: layoutProps) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
