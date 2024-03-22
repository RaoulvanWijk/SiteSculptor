import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

type SideNavContextType = {
    currentNavName: String;
    setCurrentNavName: Dispatch<SetStateAction<String>>;
    navType: String;
    setNavType: Dispatch<SetStateAction<String>>;
};

export const SideNavContext = createContext<SideNavContextType | null>(null);

export function SideNavContextProvider({ children }: { children: ReactNode }) {
    const [currentNavName, setCurrentNavName] = useState<String>("main");
    const [navType, setNavType] = useState<String>("main");
    return (
        <SideNavContext.Provider
            value={{ currentNavName, setCurrentNavName, navType, setNavType }}
        >
            {children}
        </SideNavContext.Provider>
    );
}
