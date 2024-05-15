import React from "react";
import "@/resources/styling/pages/contact.scss";
import Image from "next/image";

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
