// import { SidebarLink } from "@/components/dashboard/SidebarItems";
import { Cog, Globe, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

type SidebarLink = {
  href: string;
  title: string;
  icon: any;
};

export const defaultLinks: SidebarLink[] = [
  { href: "/app/dashboard", title: "Home", icon: HomeIcon },
  { href: "/app/account", title: "Account", icon: Cog },
  { href: "/app/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [];