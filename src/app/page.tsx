import Navbar from "@/components/interactives/Navbar";
import Footer from "@/components/statics/Footer";
import PageHeader from "@/components/statics/PageHeader";
import "@/resources/styling/pages/index.scss"
import InfoCards from "@/components/statics/InfoCards"

export default function Home() {
  return (
    <div>
      <Navbar />
      <PageHeader headerName="SiteSculptor" subHeaderName='"Empower your web design journey with our intuitive drag-and-drop interface, modular components, seamless e-commerce integration, and robust tools for responsive design, SEO optimization, user management, social media integration, security, and personalized branding."' />
      <div className="cardRow">
        <InfoCards text="Some text" type="default" />
      </div>
      <Footer />
    </div>
  );
}
