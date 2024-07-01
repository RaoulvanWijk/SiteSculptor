import React from "react";
import Link from "next/link";
import { MailIcon } from "lucide-react";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import "../../_resources/styling/footer.scss";
import { absoluteUrl } from "@/lib/utils";

type FooterProps = {
    siteId: string;
};

const getFooter = async (siteId: string) => {
    const res = await fetch(
        absoluteUrl(`/api/editor/site_footer/styling/${siteId}`),
        {
            method: "GET",
        }
    );
    const data = await res.json();
    return data;
};

export default async function Footer({ siteId }: FooterProps) {
    const footer = await getFooter(siteId);
    const { styles } = footer[0];
    return (
        <footer className={`footer`} style={styles}>
            <div className="footer-top">
                <div>LOGO</div>
                <br />
                <menu className="footer-items">
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
