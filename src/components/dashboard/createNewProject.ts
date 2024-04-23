import { SiteCreateClient, siteCreateClientSchema } from "@/lib/db/schema/sites";
import { UseFormSetError } from "react-hook-form";

export async function onSubmit(inputValue: SiteCreateClient, setError: UseFormSetError<SiteCreateClient>): Promise<string | undefined> {
    console.log("Running API POST");
    try {
        const response = await fetch('/api/editor/site/create', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: inputValue.name })
        });
        console.log(response);

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            setError("name", {
                type: "manual",
                message: data.message || "Error creating site",
            });
            console.log(data.message || "Error in response");
            return undefined;
        } else {
            console.log("Created Project with ID:", data.id);
            return data.id;
        }
    } catch (error) {
        console.error('Error:', error);
        setError("name", {
            type: "manual",
            message: "Network error, please try again"
        });
        return undefined;
    }
};
