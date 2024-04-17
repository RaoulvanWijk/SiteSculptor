"use client";
import React from "react";

export default function TestApi() {
    async function getShi() {
        const res = await fetch("/api/editor/site/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
    }
    return (
        <div>
            <button onClick={getShi}>get shi</button>
        </div>
    );
}
