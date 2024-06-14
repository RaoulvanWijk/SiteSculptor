import SettingsSidebarItems from "./SettingsSidebarItems";
import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import "@/resources/styling/components/dashboard/sidebar.scss";
import UserOverview from "./UserOverview";

const SettingsSidebar = async () => {
    const session = await getUserAuth();
    if (session.session === null) return null;

    return (
        <aside className="barstyling settings-sidebar sidebar">
            <UserOverview />
            <SettingsSidebarItems />
        </aside>
    );
};

export default SettingsSidebar;