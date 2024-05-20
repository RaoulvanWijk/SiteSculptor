"use client";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { get } from "http";

type SideNavContextType = {
    currentNavName: Array<string>;
    setCurrentNavName: Dispatch<SetStateAction<Array<string>>>;
    navType: String;
    setNavType: Dispatch<SetStateAction<String>>;
    site: Array<any>;
    page: Array<any>;
    setPage: Dispatch<SetStateAction<Array<any>>>;
    site_id: string;
    page_id: string;
    loading: boolean;
    isLoading: Dispatch<SetStateAction<boolean>>;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    navbars: Array<any>;
    setNavbars: Dispatch<SetStateAction<Array<any>>>;
    siteNavbar: Array<any>;
    setSiteNavbar: Dispatch<SetStateAction<Array<any>>>;
    footer: Array<any>;
    siteFooter: Array<any>;
    setSiteFooter: Dispatch<SetStateAction<Array<any>>>;
};

export const SideNavContext = createContext<SideNavContextType | null>(null);

async function getSiteData(site_id: string) {
    const response = await fetch(`/api/editor/site/${site_id}`);
    const data = await response.json();
    return data;
}

async function getPageData(site_id: string) {
    const response = await fetch(`/api/editor/page/site_id/${site_id}`);
    const data = await response.json();
    return data;
}

async function getNavbarData() {
    const response = await fetch(`/api/editor/navbar`);
    const data = await response.json();
    return data;
}

async function getSiteNavbar(site_id: string) {
    const response = await fetch(`/api/editor/site_navbar/styling/${site_id}`);
    const data = await response.json();
    return data;
}

async function getFooterData() {
    const response = await fetch(`/api/editor/footer`);
    const data = await response.json();
    return data;
}

async function getSiteFooter(site_id: string) {
    const response = await fetch(`/api/editor/site_footer/styling/${site_id}`);
    const data = await response.json();
    return data;
}

export function SideNavContextProvider({ children }: { children: ReactNode }) {
    const [currentNavName, setCurrentNavName] = useState<string[]>([]);
    const [navType, setNavType] = useState<String>("main");
    const [loading, isLoading] = useState<boolean>(true);

    const [navbars, setNavbars] = useState<any[]>([]);
    const [siteNavbar, setSiteNavbar] = useState<any[]>([]);

    const [footer, setFooter] = useState<any[]>([]);
    const [siteFooter, setSiteFooter] = useState<any[]>([]);

    const [modal, setModal] = useState<boolean>(false);

    const [site, setSite] = useState<any[]>([]);
    const [page, setPage] = useState<any[]>([]);

    const site_id = usePathname().split("/")[2];
    const page_id = usePathname().split("/")[3];

    useEffect(() => {
        getSiteData(site_id).then((data) => {
            setSite(data);
        });
        getNavbarData().then((data) => {
            setNavbars(data);
        });
        getPageData(site_id).then((data) => {
            setPage(data);
            isLoading(false);
        });
        getSiteNavbar(site_id).then((data) => {
            setSiteNavbar(data);
        });
        getFooterData().then((data) => {
            setFooter(data);
        });
        getSiteFooter(site_id).then((data) => {
            setSiteFooter(data);
        });
    }, [site_id]);

    // get the page name from page_id

    return (
        <SideNavContext.Provider
            value={{
                currentNavName,
                setCurrentNavName,
                navType,
                setNavType,
                site,
                page,
                setPage,
                site_id,
                page_id,
                loading,
                isLoading,
                modal,
                setModal,
                navbars,
                setNavbars,
                siteNavbar,
                setSiteNavbar,
                footer,
                siteFooter,
                setSiteFooter,
            }}
        >
            {children}
        </SideNavContext.Provider>
    );
}
