export const onSubmit = async (inputValue: string) => {
    try {
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputValue }),
        });

        if (!response.ok) {
            throw new Error('Failed to create.');
        }
        
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};