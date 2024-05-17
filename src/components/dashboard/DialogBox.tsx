import { useState } from "react";
import {
    siteCreateClientSchema,
    SiteCreateClient,
} from "@/lib/db/schema/sites";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DefaultButton from "../interactives/Button";
import { onSubmit } from "@/components/dashboard/createNewProject";
import { useRouter } from "next/navigation";

type dialogBoxProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
};

export default function DialogBox({
    children,
    title,
    description,
}: dialogBoxProps) {
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<SiteCreateClient>({
        resolver: zodResolver(siteCreateClientSchema),
    });

    const onSubmitCallback: SubmitHandler<SiteCreateClient> = async (
        data,
        event
    ) => {
        event?.preventDefault();

        // Create Logic
        const siteId = await onSubmit(data, setError);
        if (siteId) {
            router.push(`/editor/${siteId}`);
            console.log("Navigating to new site with ID:", siteId);
        } else {
            console.log("Failed to create new site");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DefaultButton buttonType="button" type="toggle">
                    {children}
                </DefaultButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmitCallback)}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="grid flex-1 gap-2">
                            <label htmlFor="link" className="sr-only">
                                {description}
                            </label>
                            <Input
                                id="link"
                                placeholder="Type here"
                                {...register("name")}
                                autoComplete="on"
                            />
                            {errors.name && (
                                <p className="text-red-500">{`${errors.name.message}`}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start mt-4">
                        <DefaultButton buttonType="submit" type="toggle">
                            {children}
                        </DefaultButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
