import { siteCreateClientSchema, SiteCreateClient } from "@/lib/db/schema/sites";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";  

export async function onSubmit(inputValue: SiteCreateClient) {
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<SiteCreateClient>({
        resolver: zodResolver(siteCreateClientSchema),
    });

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
            return;
        } else {
            // router.push("localhost:3000/app/dashboard")
        }

    } catch (error) {
        console.error('Error:', error);
    }
};
