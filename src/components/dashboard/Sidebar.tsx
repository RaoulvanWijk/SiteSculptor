import SidebarItems from "./SidebarItems";
import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import "@/resources/styling/components/dashboard/sidebar.scss";

const Sidebar = async () => {
    const session = await getUserAuth();
    if (session.session === null) return null;

    return (
        <aside className="barstyling sidebar">
            <h3 className="side-title">Navigator</h3>
            <SidebarItems />
        </aside>
    );
};

export default Sidebar;
