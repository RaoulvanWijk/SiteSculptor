import React from "react";
import "@/resources/styling/components/statics/footer.scss";

type FooterTextFieldProps = {
    Title: string;
    children?: React.ReactNode;
};

export default function FooterTextField({
    Title,
    children,
}: FooterTextFieldProps) {
    return (
        <div>
            <h1 className="footer-text-title">{Title}</h1>
            <ul>{children}</ul>
        </div>
    );
}
