import "@/resources/styling/components/SideNav/SideNavButton.scss";
import useSideNav from "@/components/hooks/useSideNav";

type ButtonProps = {
    Icon: React.ReactNode;
    text: string;
    type: string;
};

export default function Button({ Icon, text, type }: ButtonProps) {
    const { currentNavName, setCurrentNavName, setNavType } = useSideNav();

    // function to change the nav
    const changeNav = () => {
        const nextNavName = currentNavName.concat(text);

        setCurrentNavName(nextNavName);
        setNavType(type);
    };

    // function to open the footer selector
    const openFooterSelector = () => {
        const navName = currentNavName.concat("Footer");
        setCurrentNavName(navName);
        setNavType("footer");
    };

    // function to open the nav selector
    const openNavSelector = () => {
        const navName = currentNavName.concat("Navbar");
        setCurrentNavName(navName);
        setNavType("navbar");
    };

    // function to create a new page
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
