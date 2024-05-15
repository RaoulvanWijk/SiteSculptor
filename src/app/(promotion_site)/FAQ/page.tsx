import React from "react";
import "@/resources/styling/components/landingpage/statics/pageHeader.scss";
import DefaultButton from "@/components/interactives/Button";
import {
    ArrowRight,
    BarChart,
    Brush,
    Hammer,
    Power,
    ReceiptText,
    Shield,
    Star,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import "@/resources/styling/components/landingpage/statics/faq.scss";
import Link from "next/link";
import Image from "next/image";
import { FingerPrintIcon } from "@heroicons/react/20/solid";

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
                <Image
                    src={"/branding/logo_temp.png"}
                    className="logoImage"
                    height={75}
                    width={150}
                    alt="Logo Image"
                />
            </div>
            <ul className="faq">
                <li>
                    <h2>
                        Getting started <Star />
                    </h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                What is Avklo and how does it work?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo is a website builder that makes it easy to
                                create websites without any coding knowledge.
                                It&apos;s a drag-and-drop tool that lets you
                                build a website by simply dragging and dropping
                                elements onto the page. You can choose from a
                                variety of pre-designed templates and customize
                                them to fit your needs. Avklo also offers
                                hosting, domain registration, and other services
                                to help you get your website up and running
                                quickly.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                How do I sign up for an Avklo account?
                            </AccordionTrigger>
                            <AccordionContent>
                                You can sign up for an Avklo account by visiting
                                our website and clicking the{" "}
                                <Link href="/login" className="login-link">
                                    get started
                                </Link>{" "}
                                button. You&apos;ll only have to select google,
                                facebook, github or apple to login. Once
                                you&apos;ve created an account, you can start
                                building your website right away.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                Can I try Avklo for free before committing to a
                                plan?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes! At Avklo we offer a free plan that allows
                                you to build a website with limited features.
                                You can{" "}
                                <Link href="/login" className="login-link">
                                    upgrade
                                </Link>{" "}
                                to a paid plan at any time to unlock additional
                                features and functionality.{" "}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </li>
                <li>
                    <h2>
                        Building Your Website <Hammer />
                    </h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                How do I start building my website with Avklo?
                            </AccordionTrigger>
                            <AccordionContent>
                                To start building your website with Avklo,
                                simply{" "}
                                <Link href="/login" className="login-link">
                                    sign up
                                </Link>{" "}
                                for an account and choose a template to get
                                started. You can then drag and drop elements
                                onto the page to customize your site. Avklo
                                offers a variety of tools and features to help
                                you create a professional website quickly and
                                easily.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                What templates are available on Avklo?
                            </AccordionTrigger>
                            <AccordionContent>
                                At Avklo we offer a wide range of templates to
                                suit every need. Whether you&apos;re looking for
                                a simple blog design, a professional business
                                website, or an e-commerce store, we have a
                                template that will work for you. Our templates
                                are fully customizable, so you can make them
                                your own by adding your own images, text, and
                                branding.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                Can I integrate third-party tools and plugins
                                with my Avklo site?
                            </AccordionTrigger>
                            <AccordionContent>
                                Currently at Avklo do not support third-party
                                tools and plugins. However, we are working on
                                adding this feature in the future!
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </li>
                <li>
                    <h2>
                        Design and Customization <Brush />
                    </h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                How do I change the design of my Avklo website?
                            </AccordionTrigger>
                            <AccordionContent>
                                To change the design of your Avklo website, you
                                can decide to use the components from other
                                design templates. In the Avklo page settings you
                                can change the font, color, order of pages, and
                                more.
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
                                Currently, Avklo does not support custom code.
                                We are planning on adding this feature in
                                future.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                How do I ensure my website is mobile-friendly?
                            </AccordionTrigger>
                            <AccordionContent>
                                All components in Avklo are mobile-friendly, at
                                Avklo we develop components that are responsive
                                and mobile-friendly. You can use the Avklo
                                mobile preview to see how your site will look on
                                different devices.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </li>
                <li>
                    <h2>
                        SEO and Marketing <BarChart />
                    </h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                How do I optimize my Avklo website for search
                                engines?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo offers a variety of tools to help you
                                optimize your website for search engines. You
                                can add meta tags, alt text, and other elements
                                to improve your site&apos;s SEO performance.
                                Avklo is also working on making an seo tool to
                                optimse your website.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Does Avklo offer marketing tools?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo does not currently offer marketing tools.
                                However, we are working on adding this feature
                                in the future.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                How can I track my website&apos;s traffic and
                                performance?
                            </AccordionTrigger>
                            <AccordionContent>
                                On your Avklo dashboard you can see the number
                                of visitors, page views, and other metrics for
                                your website. You can also integrate Google
                                Analytics to get more detailed information about
                                your site&apos;s traffic and performance.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </li>
                <li>
                    <h2>
                        Support and Resources <ReceiptText />
                    </h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                How can I get help with my Avklo website?
                            </AccordionTrigger>
                            <AccordionContent>
                                If you need help with your Avklo website, you
                                can contact our support team by checking the{" "}
                                <Link href="/contact" className="login-link">
                                    Contact
                                </Link>{" "}
                                page.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </li>
                <li>
                    <h2>
                        Security and Privacy <Shield />
                    </h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                How secure is my Avklo website?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo takes security seriously and uses
                                industry-standard encryption to protect your
                                website and data. We also offer regular security
                                updates to keep your site safe from threats.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                What are Avklo&apos;s privacy policies?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo takes your privacy seriously and follows
                                strict privacy policies to protect your personal
                                information. You can read our privacy policy{" "}
                                <Link
                                    href="/privacy-policy"
                                    className="login-link"
                                >
                                    here
                                </Link>
                                .
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                How can I backup my Avklo website?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo automatically backs up your website. Avklo
                                does not track changes! You cannot export your
                                Avklo website to documents or other website
                                builders.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                Can I export my Avklo website?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo does not support exporting your website.
                                Your website is only available on Avklo.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </li>
                <li>
                    <h2>
                        Troubleshooting <Power />
                    </h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                How do I report a bug on my Avklo website?
                            </AccordionTrigger>
                            <AccordionContent>
                                If you encounter a bug on your Avklo website,
                                you can report it to our support team by
                                checking the{" "}
                                <Link href="/contact" className="login-link">
                                    Contact
                                </Link>{" "}
                                page.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                What should I do if my Avklo website is down or
                                experiencing issues?
                            </AccordionTrigger>
                            <AccordionContent>
                                Check if your website is published and saved. If
                                your Avklo website is still down or experiencing
                                issues, you can contact our support team by
                                checking the{" "}
                                <Link href="/contact" className="login-link">
                                    Contact
                                </Link>{" "}
                                page.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                How can I recover a deleted page or content?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo does not support recovering deleted pages
                                or content. Once you delete a page or content,
                                it cannot be recovered. Avklo will always show a
                                warning before deleting a page or content.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                How do I clear my Avklo website&apos;s cache?
                            </AccordionTrigger>
                            <AccordionContent>
                                Avklo automatically clears your website&apos;s
                                cache. You do not have to worry about clearing
                                your website&apos;s cache.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>
                                Where can I find help if I encounter technical
                                issues?
                            </AccordionTrigger>
                            <AccordionContent>
                                If you encounter technical issues, you can
                                contact our support team by checking the{" "}
                                <Link href="/contact" className="login-link">
                                    Contact
                                </Link>{" "}
                                page.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </li>
            </ul>
        </>
    );
}
