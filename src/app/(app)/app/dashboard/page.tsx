"use client"

import DashboardCard from "@/components/dashboard/DashboardCard";
import DialogBox from "@/components/dashboard/DialogBox";
import SkeletonBox from "@/components/dashboard/SkeletonBox";
import { getUserProjects } from "@/components/dashboard/getUserProjects";
import Button from "@/components/interactives/Button";
import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useSearch } from "@/components/context/SearchContext";

interface Project {
    id: string,
    name: string,
    description?: string,
}

export default function Home() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[] | null>(null);
    const { executeSearch } = useSearch();

    useEffect(() => {
        setLoading(true);
        getUserProjects().then(projects => {
            setProjects(projects);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching projects:', error);
            setLoading(false);
        });
    }, []);

    const filteredProjects = useMemo(() => {
        return (projects ?? []).filter(project =>
            project.name.toLowerCase().includes(executeSearch.toLowerCase())
        );
    }, [projects, executeSearch]);

    return (
        <main className="space-y-4">
            <h1>Welcome back, {session?.user?.name}</h1>
            {loading ? <SkeletonBox /> : filteredProjects.length > 0 ? (
                <>
                    <h3>Continue where you left off...</h3>
                    <div className="project-row">
                        {filteredProjects.map((project) => (
                            <DashboardCard
                                key={project.id}
                                type="standard"
                                imgSrc="/placeholders/pc.jpg"
                                projectName={project.name}
                                projectDesc={project.description ?? ""}
                                projectID={project.id}
                                url={`/editor/${project.id}/0`}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h3>No projects found..</h3>
                    <DialogBox title="Create a new Project" description="Give your Project a name">New Project</DialogBox>
                </>
            )}
            <h3>Latest News</h3>
            <div className="project-row">
                <DashboardCard type="withButton" imgSrc="/placeholders/pc.jpg" projectName="New Extension Released!" projectDesc="Extension description here">
                    <Button type="primary">Check out the Extension!</Button>
                </DashboardCard>
            </div>
        </main>
    );
}
