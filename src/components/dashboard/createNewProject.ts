export async function onSubmit(inputValue: string) {
    try {
        const response = await fetch('/api/editor/site/create', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: inputValue})
        });
        console.log(response);

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};