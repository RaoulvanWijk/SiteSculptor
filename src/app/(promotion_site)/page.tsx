import Navbar from "@/components/interactives/Navbar";
import Footer from "@/components/statics/Footer";
import PageHeader from "@/components/statics/PageHeader";
import InfoCards from "@/components/statics/InfoCards";
import "@/resources/styling/pages/index.scss";
import "@/resources/styling/components/layouts/layout.scss";
import DefaultButton from "@/components/interactives/DefaultButton";

export default function Home() {
    return (
        <div className="layout">
            <Navbar />
            <main>
                <div>
                    <PageHeader headerName="Unleash your creativity with our powerful visual canvas — no coding required">
                        Some text that keeps repeating. Some text that keeps
                        repeating. Some text that keeps repeating. Some text
                        that keeps repeating. Some text that keeps repeating.
                        Some text that keeps repeating.
                    </PageHeader>
                    <DefaultButton buttonName="Get started" type="primary" />
                </div>

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
