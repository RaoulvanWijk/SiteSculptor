import { siteCreateClientSchema, SiteCreateClient } from "@/lib/db/schema/sites";
import { UseFormSetError } from "react-hook-form";

export async function onSubmit(inputValue: SiteCreateClient, setError: UseFormSetError<SiteCreateClient>, onSuccessfulSubmit: () => void) {

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
                message: "Name can't be empty",
            });
            console.log("Name can't be empty");
            return;
        } else {
            onSuccessfulSubmit();
            console.log("Created Project");
        }

    } catch (error) {
        console.error('Error:', error);
    }
};
