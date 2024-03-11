import Navbar from "@/components/pages/landingpage/Navbar";
import Footer from "@/components/pages/landingpage/statics/Footer";
import PageHeader from "@/components/pages/landingpage/statics/PageHeader";
import InfoCards from "@/components/pages/landingpage/statics/InfoCards";
import "@/resources/styling/pages/index.scss";
import "@/resources/styling/components/layouts/layout.scss";
import DefaultButton from "@/components/interactives/Button";
import Example from "@/components/pages/landingpage/statics/Example";
import Overview from "@/components/pages/landingpage/overview/Overview";

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
                        Get started
                    </DefaultButton>
                </div>

                <Example />

                <Overview />

                <div className="cardRow">
                    <InfoCards header="Info Card" type="info">
                        The tree drank the water from the earth to sustain the
                        growth of it's leaves. And the human took a breath from
                        the oxygen from the tree. So we should thank the trees
                        for helping us breathe.
                    </InfoCards>
                    <InfoCards header="Info Card" type="default">
                        The tree drank the water from the earth to sustain the
                        growth of it's leaves. And the human took a breath from
                        the oxygen from the tree. So we should thank the trees
                        for helping us breathe.
                    </InfoCards>
                    <InfoCards
                        header="Info Card"
                        imgSrc="/placeholders/placeholder.jpg"
                        type="imageCard"
                    />
                    <InfoCards header="Package 1" type="pricing">
                        The tree drank the water from the earth to sustain the
                        growth of it's leaves. And the human took a breath from
                        the oxygen from the tree. So we should thank the trees
                        for helping us breathe.
                    </InfoCards>
                </div>
                <Footer />
            </main>
        </div>
    );
}
