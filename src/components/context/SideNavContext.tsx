import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

type SideNavContextType = {
    currentNavName: Array<string>;
    setCurrentNavName: Dispatch<SetStateAction<Array<string>>>;
    navType: String;
    setNavType: Dispatch<SetStateAction<String>>;
};

export const SideNavContext = createContext<SideNavContextType | null>(null);

export function SideNavContextProvider({ children }: { children: ReactNode }) {
    const [currentNavName, setCurrentNavName] = useState<string[]>([]);
    const [navType, setNavType] = useState<String>("main");
    return (
        <SideNavContext.Provider
            value={{ currentNavName, setCurrentNavName, navType, setNavType }}
        >
            {children}
        </SideNavContext.Provider>
    );
}
