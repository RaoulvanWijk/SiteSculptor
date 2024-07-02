import React from "react";
import { absoluteUrl } from "@/lib/utils";
import Component from "./Component";

const getPages = async (siteId: string) => {
    const res = await fetch(absoluteUrl(`/api/editor/page/site_id/${siteId}`), {
        method: "GET",
    });
    const data = await res.json();
    return data;
};

const getPageComponents = async (pageId: string) => {
    const res = await fetch(
        absoluteUrl(`/api/editor/page_components/page_id/${pageId}`),
        {
            method: "GET",
        }
    );

    const data = await res.json();
    return data;
};

const getComponent = async (componentId: string) => {
    const res = await fetch(
        absoluteUrl(`/api/editor/component/${componentId}`),
        {
            method: "GET",
        }
    );

    const data = await res.json();
    return data;
};

const getComponentType = async (componentTypeId: string) => {
    console.log("componentTypeId", componentTypeId);
    const res = await fetch(
        absoluteUrl(`/api/editor/component_types/${componentTypeId}`),
        {
            method: "GET",
        }
    );
    const data = await res.json();
    return data;
};

const renderComponent = async (pageComponent: any) => {
    const comp = await getComponent(pageComponent.componentId);
    const compType = await getComponentType(comp[0].type);

    return compType[0];
};

export default async function Components({ siteId, page }: any) {
    const pages = await getPages(siteId);
    // get the page id
    const pageId = pages.find((p: any) => p.slug === page);
    if (!pageId) {
        return <div>Page not found</div>;
    }

    const components = await getPageComponents(pageId.id);
    console.log("components", components);

    return (
        <div>
            {components.map(async (pageComponent: any) => {
                const comp = await renderComponent(pageComponent);
                console.log("comp", comp);
                return <Component type={comp.name} key={comp.id} />;
            })}
        </div>
    );
}
