import React from "react";
import "@/resources/styling/components/landingpage/statics/footer.scss";
import FooterTextField from "./FooterTextField";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="pageFooter">
            <div className="logo">LOGO</div>
            <FooterTextField Title="Product">
                <li>
                    <Link href="/">Overview</Link>
                </li>
                <li>
                    <Link href="/">Editor</Link>
                </li>
                <li>
                    <Link href="/">Pricing</Link>
                </li>
                <li>
                    <Link href="/">Market</Link>
                </li>
                <li>
                    <Link href="/">Security</Link>
                </li>
                <li>
                    <Link href="/">Roadmap</Link>
                </li>
            </FooterTextField>
            <FooterTextField Title="Support">
                <li>
                    <Link href="/">FAQ</Link>
                </li>
                <li>
                    <Link href="/">Documentation</Link>
                </li>
                <li>
                    <Link href="/">Community Forum</Link>
                </li>
                <li>
                    <Link href="/">Developer Support</Link>
                </li>
                <li>
                    <Link href="/">Status</Link>
                </li>
                <li>
                    <Link href="/">Contact form</Link>
                </li>
            </FooterTextField>
            <FooterTextField Title="Company">
                <li>
                    <Link href="/">About</Link>
                </li>
                <li>
                    <Link href="/">Press</Link>
                </li>
                <li>
                    <Link href="/">Terms of service</Link>
                </li>
                <li>
                    <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="/">Cookie Policy</Link>
                </li>
                <li>
                    <Link href="/">Cookie preferences</Link>
                </li>
            </FooterTextField>
        </footer>
    );
}
