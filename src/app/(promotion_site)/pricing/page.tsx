import React from "react";
import "@/resources/styling/pages/contact.scss";
import Image from "next/image";
import Head from "next/head";

export default function page() {
    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content="Websites, web builder, website builder, Avklo, avklo, avklo website builder, website builder, easy website builder, fast website builder, website builder for free, website builder for business, website builder for personal use,"
                />
                <meta
                    name="description"
                    content="Checkout our pricing plans. Our offers will be coming soon. Stay tuned for more on our socials."
                    key="desc"
                />
            </Head>
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
