import React from "react";
import "@/resources/styling/pages/contact.scss";
import Image from "next/image";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Avklo | pricing",
    keywords:
        "Websites, web builder, website builder, Avklo, avklo, avklo website builder, website builder, easy website builder, fast website builder, website builder for free, website builder for business, website builder for personal use,",
    description:
        "Checkout our pricing plans. Our offers will be coming soon. Stay tuned for more on our socials.",
};

export default function page() {
    return (
        <>
            <div className="page-header-contact">
                <div className="left">
                    <h1>Pricing</h1>
                    <p>
                        Our offers will be coming soon. Stay tuned for more on
                        our socials.
                    </p>
                </div>
                <Image
                    src={"/branding/logo_temp.png"}
                    className="logoImage"
                    height={75}
                    width={150}
                    alt="Logo Image"
                />
            </div>
        </>
    );
}
