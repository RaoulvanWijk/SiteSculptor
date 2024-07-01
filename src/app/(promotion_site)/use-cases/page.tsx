import React from "react";
import "@/resources/styling/pages/contact.scss";
import Image from "next/image";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Avklo | Use cases",
    keywords:
        "Websites, web builder, website builder, Avklo, avklo, avklo website builder, website builder, easy website builder, fast website builder, website builder for free, website builder for business, website builder for personal use,",
    description: "The first projects are coming soon. Stay tuned for more!",
};

export default function page() {
    return (
        <>
            <div className="page-header-contact">
                <div className="left">
                    <h1>Use cases</h1>
                    <p>
                        The first projects are coming soon. Stay tuned for more!
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
