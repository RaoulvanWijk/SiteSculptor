import PageHeader from "@/app/(promotion_site)/_components/PageHeader";
import InfoCards from "@/app/(promotion_site)/_components/InfoCards";
import "@/resources/styling/pages/index.scss";
import "@/resources/styling/components/layouts/layout.scss";
import Example from "@/app/(promotion_site)/_components/Example";
import Overview from "./_components/overview/Overview";
import BottomCTO from "@/components/pages/landingpage/statics/BottomCTO";
import { AlarmClock, PackageCheck, Palette, Zap } from "lucide-react";

export default function Home() {
    return (
        <>
            <div className="topcontent">
                <PageHeader headerName="Unleash your creativity with our powerful visual canvas — no coding required">
                    Some text that keeps repeating. Some text that keeps
                    repeating. Some text that keeps repeating. Some text that
                    keeps repeating. Some text that keeps repeating. Some text
                    that keeps repeating.
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
