import Navbar from "../_components/static/Navbar";
import React from "react";

type layoutProps = {
    children: React.ReactNode;
    params: any;
};

const checkSubdomain = async (subdomain: string) => {
    const res = await fetch(
        `http://localhost:3000/api/editor/site/check_site/${subdomain}`,
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
    const { siteId } = data[0];
    console.log(data);

    if (data.message === "Site not found") {
        return <div>Site not found</div>;
    }
    return (
        <div>
            <Navbar siteId={siteId} />
            <main>{children}</main>
        </div>
    );
}
