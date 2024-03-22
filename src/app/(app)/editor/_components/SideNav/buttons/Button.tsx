import "@/resources/styling/components/SideNav/SideNavButton.scss";
import useSideNav from "@/components/hooks/useSideNav";

type ButtonProps = {
    Icon: React.ReactNode;
    text: string;
    type: string;
};

export default function Button({ Icon, text, type }: ButtonProps) {
    const { setCurrentNavName, setNavType } = useSideNav();

    const changeNavWithComponentSelector = () => {
        setCurrentNavName(text);
        setNavType(type);
    };

    const changeNav = () => {
        setCurrentNavName(text);
    };

    const openFooterSelector = () => {};
    const openNavSelector = () => {};

    switch (type) {
        case "page-select":
            return (
                <button
                    className="sidenavbutton"
                    onClick={changeNavWithComponentSelector}
                >
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
