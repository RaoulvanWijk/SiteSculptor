import { useState } from 'react';
import { siteCreateClientSchema, SiteCreateClient } from "@/lib/db/schema/sites";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DefaultButton from "../interactives/Button"
import { onSubmit } from "@/components/dashboard/createNewProject"

type dialogBoxProps = {
    children: React.ReactNode,
    title?: string,
    description?: string,
}

export default function DialogBox({ children, title, description }: dialogBoxProps) {
    const [inputValue, setInputValue] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<SiteCreateClient>({
        resolver: zodResolver(siteCreateClientSchema),
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DefaultButton buttonType='button' type="toggle">{children}</DefaultButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                {description}
                            </Label>
                            <Input
                                id="link"
                                placeholder="Type here"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-red-500">{`${errors.name.message}`}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start mt-4">
                        <DefaultButton buttonType='submit' type="toggle">{children}</DefaultButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
