import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type SideNavContextType = {
    currentNavName: Array<string>;
    setCurrentNavName: Dispatch<SetStateAction<Array<string>>>;
    navType: String;
    setNavType: Dispatch<SetStateAction<String>>;
    site: Array<any>;
    page: Array<any>;
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

    const [site, setSite] = useState([]);
    const [page, setPage] = useState([]);

    const site_id = usePathname().split("/")[1];

    useEffect(() => {
        getSiteData(site_id).then((data) => {
            setSite(data);
        });
        getPageData(site_id).then((data) => {
            setPage(data);
        });
    }, []);

    console.log(site, "site");
    console.log(page, "page");
    return (
        <SideNavContext.Provider
            value={{
                currentNavName,
                setCurrentNavName,
                navType,
                setNavType,
                site,
                page,
            }}
        >
            {children}
        </SideNavContext.Provider>
    );
}
