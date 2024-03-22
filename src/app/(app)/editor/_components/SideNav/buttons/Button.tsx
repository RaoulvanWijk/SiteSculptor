import "@/resources/styling/components/SideNav/SideNavButton.scss";
import useSideNav from "@/components/hooks/useSideNav";

type ButtonProps = {
    Icon: React.ReactNode;
    text: string;
    type: string;
};

export default function Button({ Icon, text, type }: ButtonProps) {
    const { currentNavName, setCurrentNavName, setNavType } = useSideNav();

    const changeNav = () => {
        // add text to currentNavName
        const nextNavName = currentNavName.concat(text);

        setCurrentNavName(nextNavName);
        setNavType(type);
    };
    const openFooterSelector = () => {
        const navName = currentNavName.concat("Footer");
        setCurrentNavName(navName);
        setNavType("footer");
    };
    const openNavSelector = () => {
        const navName = currentNavName.concat("Navbar");
        setCurrentNavName(navName);
        setNavType("navbar");
    };
    const newPage = () => {};

    switch (type) {
        case "page-select":
            return (
                <button className="sidenavbutton" onClick={changeNav}>
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
        case "page-component":
            return (
                <button className="sidenavbutton" onClick={changeNav}>
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
        case "new-page":
            return (
                <button className="sidenavbutton" onClick={newPage}>
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
        case "footer":
            return (
                <button className="sidenavbutton" onClick={openFooterSelector}>
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
        case "nav":
            return (
                <button className="sidenavbutton" onClick={openNavSelector}>
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
    }
}
