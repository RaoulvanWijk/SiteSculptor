import Navbar from "../_components/static/Navbar";
import Footer from "../_components/static/Footer";
import React from "react";
import "../_resources/styling/layout.scss";

type layoutProps = {
    children: React.ReactNode;
    params: any;
};

const checkSubdomain = async (subdomain: string) => {
    const res = await fetch(
        `https://avklo.com/api/editor/site/check_site/${subdomain}`,
        {
            method: "GET",
        }
    );
    const data = await res.json();
    return data;
};

export default async function layout({ children, params }: layoutProps) {
    const { subdomain } = params;
    const data = await checkSubdomain(subdomain[0]);

    if (data.message === "Site not found") {
        return <div>Site not found</div>;
    }
    const { id } = data[0];

    return (
        <>
            <Navbar siteId={id} />
            <main className="layout">{children}</main>
            <Footer siteId={id} />
        </>
    );
}
