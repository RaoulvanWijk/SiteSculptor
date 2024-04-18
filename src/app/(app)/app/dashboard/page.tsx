"use client"

import SignIn from "@/components/auth/SignIn";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DialogBox from "@/components/dashboard/DialogBox";
import SkeletonBox from "@/components/dashboard/SkeletonBox";
import { getUserProjects } from "@/components/dashboard/getUserProjects";
import Button from "@/components/interactives/Button";
import React, { useState, useEffect } from "react";

interface Project {
    id: string,
    name: string,
    description?: string,
}

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setProjects(await getUserProjects());
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [loading]);

    return <main className="space-y-4">
        <h1>Welcome Back</h1>
        <h3>Continue where you left of..</h3>
        <div className="project-row">
            {/* <SkeletonBox /> */}
            {projects ? (
                projects.map((project) => (
                    <React.Fragment key={project.id}>
                        <DashboardCard
                            type="standard"
                            imgSrc="/placeholders/pc.jpg"
                            projectName={project.name}
                            projectDesc={project.description ?? ""}
                            url={`/editor/${project.id}/0`}
                        />
                    </React.Fragment>
                ))
            ) : (
               <SkeletonBox />
            )}
        </div>
        <h3>Latest News</h3>
        <div className="project-row">
            {/* Logic to import element dynamically */}
            <DashboardCard type="withButton" imgSrc="/placeholders/pc.jpg" projectName="New Extension Released!" projectDesc="Extension description here">
                <Button type="primary">Check out the Extension!</Button>
            </DashboardCard>
        </div>
    </main>
}
