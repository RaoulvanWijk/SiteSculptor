import PageHeader from "@/app/(promotion_site)/_components/PageHeader";
import InfoCards from "@/app/(promotion_site)/_components/InfoCards";
import "@/resources/styling/pages/index.scss";
import Example from "@/app/(promotion_site)/_components/Example";
import Overview from "./_components/overview/Overview";
import BottomCTO from "@/components/pages/landingpage/statics/BottomCTO";
import { AlarmClock, PackageCheck, Palette, Zap } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Avklo",
    keywords:
        "Websites, web builder, website builder, Avklo, avklo, avklo website builder, website builder, easy website builder, fast website builder, website builder for free, website builder for business, website builder for personal use,",
    description:
        "Create your own website today! With our easy to use editor, you can create a website that truly represents you or your business in just 2 minutes! Get started now!",
};

export default function Home() {
    const header = headers().get("x-subdomain");
    if (header == "minecraft") {
        return (
            <div>
                <h1>minecraft</h1>
            </div>
        );
    }
    return (
        <>
            <div className="topcontent">
                <PageHeader headerName="Describe yourself in one website, in just 2 minutes!">
                    Join the revolution and create your own website today! With
                    our easy to use editor, you can create a website that truly
                    represents you or your business in just 2 minutes! Get
                    started now!
                </PageHeader>
            </div>

            <Example />

            <Overview />

            <div className="cardRow">
                <InfoCards icon={<Zap />} type="light">
                    Designed to be easy to use!
                </InfoCards>
                <InfoCards header="" type="dark"></InfoCards>
            </div>
            <div className="cardRow">
                <InfoCards header="" type="dark"></InfoCards>
                <InfoCards icon={<Palette />} type="light">
                    Easily customizable
                </InfoCards>
            </div>
            <div className="cardRow">
                <InfoCards icon={<PackageCheck />} type="light">
                    Everything you need in one place!
                </InfoCards>
                <InfoCards type="dark"></InfoCards>
            </div>
            <div className="cardRow">
                <InfoCards header="" type="dark"></InfoCards>
                <InfoCards icon={<AlarmClock />} type="light">
                    Fastest way to build your website
                </InfoCards>
            </div>
            <BottomCTO />
        </>
    );
}
