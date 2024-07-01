import React from "react";

export default function page(props: any) {
    const [site, page] = props.params.subdomain;

    return (
        <div>
            {site} | {page ? page : "home"}
        </div>
    );
}
