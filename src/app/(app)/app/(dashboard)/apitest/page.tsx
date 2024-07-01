"use client";

import React from "react";

export default function page() {
    async function createSite() {
        const response = await fetch(
            "http://localhost:3000/api/editor/site/update/3x7olh5m3lxbl1bdimt2v",
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "My Site",
                }),
            }
        );
        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <button onClick={createSite}>Create Site</button>
        </div>
    );
}
