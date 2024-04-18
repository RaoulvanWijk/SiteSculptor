"use client"

import SignIn from "@/components/auth/SignIn";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DialogBox from "@/components/dashboard/DialogBox";
import SkeletonBox from "@/components/dashboard/SkeletonBox";
import { getUserProjects } from "@/components/dashboard/getUserProjects";
import Button from "@/components/interactives/Button";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Project {
    id: string,
    name: string,
    description?: string,
}

export default function Home() {
    const { data: session, status } = useSession();
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
        <h1>Welcome back, {session?.user.name}</h1>
        {projects && projects.length > 0 ? (
            <>
                <h3>Continue where you left off...</h3>
                <div className="project-row">
                    {projects.map((project) => (
                        <React.Fragment key={project.id}>
                            <DashboardCard
                                type="standard"
                                imgSrc="/placeholders/pc.jpg"
                                projectName={project.name}
                                projectDesc={project.description ?? ""}
                                projectID={project.id}
                                url={`/editor/${project.id}/0`}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </>
        ) : (
            <>
                <h3>No projects created yet...</h3>
                <DialogBox title="Create a new Project" description="Give your Project a name" >New Project</DialogBox>

            </>
        )}

        <h3>Latest News</h3>
        <div className="project-row">
            {/* Logic to import element dynamically */}
            <DashboardCard type="withButton" imgSrc="/placeholders/pc.jpg" projectName="New Extension Released!" projectDesc="Extension description here">
                <Button type="primary">Check out the Extension!</Button>
            </DashboardCard>
        </div>
    </main>
}
