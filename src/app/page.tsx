'use client'

import Navbar from "@/components/interactives/Navbar";
import Footer from "@/components/statics/Footer";
import PageHeader from "@/components/statics/PageHeader";
import InfoCards from "@/components/statics/InfoCards"
import "@/resources/styling/pages/index.scss"

export default function Home() {
  return (
    <div>
      <Navbar />
      <PageHeader headerName="SiteSculptor" subHeaderName='"Empower your web design journey with our intuitive drag-and-drop interface, modular components, seamless e-commerce integration, and robust tools for responsive design, SEO optimization, user management, social media integration, security, and personalized branding."' />

      <div className="cardRow">
        <InfoCards header="Info Card" text="The tree drank the water from the earth to sustain the growth of it's leaves. And the human took a breath from the oxygen from the tree. So we should thank the trees for helping us breathe." type="info" />
        <InfoCards header="Info Card" text="The tree drank the water from the earth to sustain the growth of it's leaves. And the human took a breath from the oxygen from the tree. So we should thank the trees for helping us breathe." type="default" />
        <InfoCards header="Info Card" imgSrc="/placeholders/placeholder.jpg" type="imageCard" />
        <InfoCards header="Package 1" text="Really Cool Package" type="pricing" />
      </div>
      <Footer />
    </div>
  );
}
