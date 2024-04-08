import { useState } from 'react';
import {
    Dialog,
    DialogClose,
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
    children: string,
    title?: string,
    description?: string,
}

export default function DialogBox({ children, title, description }: dialogBoxProps) {
    const [inputValue, setInputValue] = useState("");
    return (
        <Dialog>
            <DialogTrigger asChild>
                <DefaultButton type="toggle">{children}</DefaultButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            {description}
                        </Label>
                        <Input
                            id="link"
                            defaultValue="Type here"
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <DefaultButton onClick={() => onSubmit(inputValue)} type="toggle">{children}</DefaultButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
