import Link from "next/link";
import React from "react";

export default function OverviewButton() {
    return (
        <Link href="/" className="overview-button">
            <h2>Title</h2>
            <p>description</p>
            <br />
        </Link>
    );
}
