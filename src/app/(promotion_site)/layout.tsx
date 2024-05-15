import React from "react";
import Navbar from "@/components/pages/landingpage/Navbar";
import Footer from "@/components/pages/landingpage/statics/Footer";

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
