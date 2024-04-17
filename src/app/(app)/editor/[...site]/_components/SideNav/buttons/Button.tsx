import "@/resources/styling/components/SideNav/SideNavButton.scss";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";

import useSideNav from "@/components/hooks/useSideNav";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type ButtonProps = {
    Icon: React.ReactNode;
    text: string;
    type: string;
    id: string;
};

export default function Button({ Icon, text, type, id }: ButtonProps) {
    // function to change the nav

    const { currentNavName, setCurrentNavName, setNavType, site, page } =
        useSideNav();

    const router = usePathname();
    const page_id = router.split("/")[3];

    const changeNavPage = () => {};

    // function to open the footer selector
    const openFooterSelector = () => {
        const navName = currentNavName.concat("Footer");
        setCurrentNavName(navName);
        setNavType("footer");
    };

    const changeNav = () => {
        const nextNavName = currentNavName.concat(text);

        setCurrentNavName(nextNavName);
        setNavType(type);
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
        case "break":
            return <div className="subtitle">{text}</div>;
        case "break-top":
            return <div className="subtitle subtitle-top">{text}</div>;
        case "page-select":
            return (
                <Link href={`/editor/${site[0]?.id}/${id}/`} shallow={true}>
                    <button
                        className="sidenavbutton"
                        onClick={changeNavPage}
                        id={id}
                    >
                        <span>{text}</span>
                        <span>{Icon}</span>
                    </button>
                </Link>
            );
        case "page-component":
            return (
                <button className="sidenavbutton" onClick={changeNav} id={id}>
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
        case "new-page":
            return (
                <button
                    className="sidenavbutton new-page"
                    onClick={newPage}
                    id={id}
                >
                    <span>{Icon}</span>
                </button>
            );
        case "footer":
            return (
                <button
                    className="sidenavbutton"
                    onClick={openFooterSelector}
                    id={id}
                >
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
        case "nav":
            return (
                <button
                    className="sidenavbutton"
                    onClick={openNavSelector}
                    id={id}
                >
                    <span>{text}</span>
                    <span>{Icon}</span>
                </button>
            );
        case "dashboard":
            return (
                <Link href={`/app/dashboard`} shallow={true}>
                    <button className="sidenavbutton" id={id}>
                        <span>{text}</span>
                        <span>{Icon}</span>
                    </button>
                </Link>
            );
    }
}
