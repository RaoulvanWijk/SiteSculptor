import Navbar from "@/components/pages/landingpage/Navbar";
import Footer from "@/components/pages/landingpage/statics/Footer";
import PageHeader from "@/components/pages/landingpage/statics/PageHeader";
import InfoCards from "@/components/pages/landingpage/statics/InfoCards";
import "@/resources/styling/pages/index.scss";
import "@/resources/styling/components/layouts/layout.scss";
import DefaultButton from "@/components/interactives/Button";
import Example from "@/components/pages/landingpage/statics/Example";
import Overview from "@/components/pages/landingpage/overview/Overview";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="layout">
            <Navbar />
            <main>
                <div className="topcontent">
                    <PageHeader headerName="Unleash your creativity with our powerful visual canvas — no coding required">
                        Some text that keeps repeating. Some text that keeps
                        repeating. Some text that keeps repeating. Some text
                        that keeps repeating. Some text that keeps repeating.
                        Some text that keeps repeating.
                    </PageHeader>
                    <DefaultButton type="primary" linkTo="/">
                        Get started <ArrowRight />
                    </DefaultButton>
                </div>

                <Example />

                <Overview />

                <div className="cardRow">
                    <InfoCards header="" type="light"></InfoCards>
                    <InfoCards header="" type="dark"></InfoCards>
                </div>
                <div className="cardRow">
                    <InfoCards header="" type="dark"></InfoCards>
                    <InfoCards header="" type="light"></InfoCards>
                </div>
                <div className="cardRow">
                    <InfoCards header="" type="light"></InfoCards>
                    <InfoCards header="" type="dark"></InfoCards>
                </div>
                <div className="cardRow">
                    <InfoCards header="" type="dark"></InfoCards>
                    <InfoCards header="" type="light"></InfoCards>
                </div>
                <Footer />
            </main>
        </div>
    );
}
