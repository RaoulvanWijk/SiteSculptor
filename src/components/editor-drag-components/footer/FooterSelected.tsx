import React from "react";
import useSideNav from "@/components/hooks/useSideNav";
import Link from "next/link";
import { Mail, MailIcon } from "lucide-react";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import "@/resources/styling/components/SideNav/footerselected.scss";

export default function FooterSelected({ className, stijl, sideNav }: any) {
    if (sideNav) {
        return (
            <footer className={`footerselected ${className}`} style={stijl}>
                <div className="footer-top">
                    <div>LOGO</div>
                    <br />
                    <menu className="footerselected-items">
                        <li>
                            <Link href="#">
                                <TwitterLogoIcon className="footer-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <InstagramLogoIcon className="footer-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <MailIcon className="footer-icon" />
                            </Link>
                        </li>
                    </menu>
                </div>
                <p>
                    © 2024 <Link href="#">avklo.com</Link>
                </p>
            </footer>
        );
    } else {
        return (
            <footer className={`footerselected ${className}`} style={stijl}>
                <div className="footer-top">
                    <div>LOGO</div>
                    <br />
                    <menu className="footerselected-items">
                        <li>
                            <Link href="#">
                                <TwitterLogoIcon className="footer-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <InstagramLogoIcon className="footer-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <MailIcon className="footer-icon" />
                            </Link>
                        </li>
                    </menu>
                </div>
                <p>
                    © 2024 <Link href="#">avklo.com</Link>
                </p>
            </footer>
        );
    }
}
