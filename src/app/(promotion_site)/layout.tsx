import React from "react";
import Navbar from "@/components/pages/landingpage/Navbar";
import Footer from "@/components/pages/landingpage/statics/Footer";
import { headers } from "next/headers";
import router from "next/router";

import "@/resources/styling/components/layouts/layout.scss";
import { redirect } from "next/navigation";

type layoutProps = {
    children: React.ReactNode;
};

export default function layout({ children }: layoutProps) {
    return (
        <div>
            <Navbar />
            <div className="layout">
                <main>{children}</main>
                {/* <Footer /> */}
            </div>
        </div>
    );
}
