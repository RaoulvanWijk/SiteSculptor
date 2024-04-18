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
import { set } from "zod";

type SideNavContextType = {
    currentNavName: Array<string>;
    setCurrentNavName: Dispatch<SetStateAction<Array<string>>>;
    navType: String;
    setNavType: Dispatch<SetStateAction<String>>;
    site: Array<any>;
    page: Array<any>;
    site_id: string;
    page_id: string;
    loading: boolean;
    isLoading: Dispatch<SetStateAction<boolean>>;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
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

export function SideNavContextProvider({ children }: { children: ReactNode }) {
    const [currentNavName, setCurrentNavName] = useState<string[]>([]);
    const [navType, setNavType] = useState<String>("main");
    const [loading, isLoading] = useState<boolean>(true);

    const [modal, setModal] = useState<boolean>(false);

    const [site, setSite] = useState([]);
    const [page, setPage] = useState([]);

    const site_id = usePathname().split("/")[2];
    const page_id = usePathname().split("/")[3];

    useEffect(() => {
        getSiteData(site_id).then((data) => {
            setSite(data);
        });
        getPageData(site_id).then((data) => {
            setPage(data);
            isLoading(false);
        });
    }, []);

    console.log(loading);

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
                site_id,
                page_id,
                loading,
                isLoading,
                modal,
                setModal,
            }}
        >
            {children}
        </SideNavContext.Provider>
    );
}
