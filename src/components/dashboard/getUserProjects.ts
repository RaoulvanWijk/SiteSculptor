"use client"

export async function getUserProjects() {
    try {
        const response = await fetch('/api/editor/site/user', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}
