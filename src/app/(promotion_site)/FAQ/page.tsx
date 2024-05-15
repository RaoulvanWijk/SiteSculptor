import React from "react";
import "@/resources/styling/components/landingpage/statics/pageHeader.scss";
import DefaultButton from "@/components/interactives/Button";
import { ArrowRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import "@/resources/styling/components/landingpage/statics/faq.scss";
import Link from "next/link";

export default function page() {
    return (
        <>
            <div className="page-header-faq">
                <div className="left">
                    <h1>FAQ</h1>
                    <p>
                        Checkout here the most frequently asked questions. Like
                        how to get started, how to build your website, our
                        features, designs, hosing, SEO, support and resources,
                        pricing and billing, security and privacy and
                        troubleshooting.{" "}
                    </p>
                </div>
            </div>
            <div className="faq">
                <ul>
                    <li>
                        <h2>Getting started</h2>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    What is Avklo and how does it work?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Avklo is a website builder that makes it
                                    easy to create websites without any coding
                                    knowledge. It&apos;s a drag-and-drop tool
                                    that lets you build a website by simply
                                    dragging and dropping elements onto the
                                    page. You can choose from a variety of
                                    pre-designed templates and customize them to
                                    fit your needs. Avklo also offers hosting,
                                    domain registration, and other services to
                                    help you get your website up and running
                                    quickly.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    How do I sign up for an Avklo account?
                                </AccordionTrigger>
                                <AccordionContent>
                                    You can sign up for an Avklo account by
                                    visiting our website and clicking the{" "}
                                    <Link href="/login" className="login-link">
                                        get started
                                    </Link>{" "}
                                    button. You&apos;ll only have to select
                                    google, facebook, github or apple to login.
                                    Once you&apos;ve created an account, you can
                                    start building your website right away.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Can I try Avklo for free before committing
                                    to a plan?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes! At Avklo we offer a free plan that
                                    allows you to build a website with limited
                                    features. You can{" "}
                                    <Link href="/login" className="login-link">
                                        upgrade
                                    </Link>{" "}
                                    to a paid plan at any time to unlock
                                    additional features and functionality.{" "}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>
                    <li>
                        <h2>Building Your Website</h2>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    How do I start building my website with
                                    Avklo?
                                </AccordionTrigger>
                                <AccordionContent>
                                    To start building your website with Avklo,
                                    simply sign up for an account and choose a
                                    template to get started. You can then drag
                                    and drop elements onto the page to customize
                                    your site. Avklo offers a variety of tools
                                    and features to help you create a
                                    professional website quickly and easily.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    What templates are available on Avklo?
                                </AccordionTrigger>
                                <AccordionContent>
                                    At Avklo offer a wide range of templates to
                                    suit every need. Whether you&apos;re looking
                                    for a simple blog design, a professional
                                    business website, or an e-commerce store, we
                                    have a template that will work for you. Our
                                    templates are fully customizable, so you can
                                    make them your own by adding your own
                                    images, text, and branding.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Can I integrate third-party tools and
                                    plugins with my Avklo site?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Currently at Avklo do not support
                                    third-party tools and plugins. However, we
                                    are working on adding this feature in the
                                    future!
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>
                    <li>
                        <h2>Design and Customization</h2>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    How do I change the design of my Avklo
                                    website?
                                </AccordionTrigger>
                                <AccordionContent>
                                    To change the design of your Avklo website,
                                    you can decide to use the components from
                                    other design templates. In the Avklo page
                                    settings you can change the font, color,
                                    order of pages, and more.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Can I use custom code (HTML/CSS) on my Avklo
                                    site?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Currently, Avklo does not support custom
                                    code. We are planning on adding this feature
                                    in future.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    How do I ensure my website is
                                    mobile-friendly?
                                </AccordionTrigger>
                                <AccordionContent>
                                    All components in Avklo are mobile-friendly,
                                    at avklo we develop components that are
                                    responsive and mobile-friendly. You can use
                                    the Avklo mobile preview to see how your
                                    site will look on different devices.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>
                </ul>
            </div>
        </>
    );
}
