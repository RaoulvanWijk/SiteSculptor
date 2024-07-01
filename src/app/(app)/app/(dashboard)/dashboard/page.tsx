"use client"

import DashboardCard from "@/components/dashboard/DashboardCard";
import DialogBox from "@/components/dashboard/DialogBox";
import SkeletonBox from "@/components/dashboard/SkeletonBox";
import { getUserProjects } from "@/components/dashboard/getUserProjects";
import Button from "@/components/interactives/Button";
import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useSearch } from "@/components/context/SearchContext";
import { useSidebar } from "@/components/context/SidebarContext";
import DefaultButton from "@/components/interactives/Button";

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
    const { currentSection, resetView } = useSidebar();

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

    const handleDeleteProject = (projectId: string) => {
        setProjects(currentProjects => {
            if (currentProjects === null) {
                return null;
            }
            return currentProjects.filter(project => project.id !== projectId);
        });
    };

    const handleRenameProject = (projectId: string, newName: string) => {
        setProjects(currentProjects => {
            if (!currentProjects) return null;

            return currentProjects.map(project => {
                if (project.id === projectId) {
                    return { ...project, name: newName };
                }
                return project;
            });
        });
    };

    const handleOptionProject = (projectId: string) => {
        
    }

    const filteredProjects = useMemo(() => {
        const baseProjects = projects ?? [];

        return baseProjects.filter(project =>
            project.name.toLowerCase().includes(executeSearch.toLowerCase())
        ).sort((a, b) => a.name.localeCompare(b.name));
    }, [projects, executeSearch, currentSection]);

    return (
        <main className="ml-4 space-y-4">
            <h1>Welcome back, {session?.user?.name}</h1>
            {loading ? (
                <SkeletonBox />
            ) : (
                <>
                    {currentSection === "all" || currentSection === "projects" ? (
                        <>
                            {filteredProjects.length > 0 && (
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
                                                url={`/editor/${project.id}`}
                                                onDelete={handleDeleteProject}
                                                onRename={handleRenameProject}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            {filteredProjects.length === 0 && (
                                <>
                                    <h3>No projects found.</h3>
                                    <DialogBox title="Create a new Project" description="Give your Project a name">New Project</DialogBox>
                                </>
                            )}
                        </>
                    ) : null}
                    {currentSection === "all" || currentSection === "extensions" ? (
                        <>
                            <h3>Latest News</h3>
                            <div className="project-row">
                                <DashboardCard
                                    type="withButton"
                                    imgSrc="/placeholders/pc.jpg"
                                    projectName="New Extension Released!"
                                    projectDesc="Extension description here"
                                >
                                    <DefaultButton type="primary">Check out the Extension!</DefaultButton>
                                </DashboardCard>
                            </div>
                        </>
                    ) : null}
                </>
            )}
        </main>
    );
}
