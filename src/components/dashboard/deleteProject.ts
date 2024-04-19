export async function deleteProject(projectID: any) {
    try {
        const response = await fetch(`/api/editor/site/delete/${projectID}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Log success message
        } else {
            throw new Error('Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
    }
}
