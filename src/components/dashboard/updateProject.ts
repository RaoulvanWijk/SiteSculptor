import { SiteCreateClient } from "@/lib/db/schema/sites";

export async function updateProjectName(projectID: string, newName: string) {
    try {
        const response = await fetch(`/api/editor/site/update/${projectID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });
        if (!response.ok) {
            throw new Error('Failed to update project name');
        }
        const data = await response.json();
        console.log(data.message); // Log success message
    } catch (error) {
        console.error('Error updating project:', error);
    }
}