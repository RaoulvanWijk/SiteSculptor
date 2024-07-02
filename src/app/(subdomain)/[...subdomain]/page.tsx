import React from "react";
import Components from "../_components/static/Components";
import { absoluteUrl } from "@/lib/utils";

const checkSubdomain = async (subdomain: string) => {
    const res = await fetch(
        absoluteUrl(`/api/editor/site/check_site/${subdomain}`),
        {
            method: "GET",
            cache: "no-cache",
        }
    );
    try {
        if (!res.ok) {
            console.table(res);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

export default async function page(props: any) {
    const [site, page] = props.params.subdomain;
    const data = await checkSubdomain(site);

    const { id } = data[0];

    return (
        <div>
            <Components siteId={id} page={page ?? "home"} />
        </div>
    );
}
