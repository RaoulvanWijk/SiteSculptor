import React, { useEffect, useRef } from "react";
import { FormEvent } from "react";
import "@/resources/styling/components/SideNav/addpagemodal.scss";
import useSideNav from "@/components/hooks/useSideNav";
import Button from "@/components/interactives/Button";
import DefaultButton from "@/components/interactives/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    PageCreateClient,
    pageCreateClientSchema,
} from "@/lib/db/schema/pages";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddPage() {
    const ref = useRef<HTMLDialogElement>(null);

    const { modal, setModal } = useSideNav();

    useEffect(() => {
        if (modal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [modal]);

    const { setError } = useForm<PageCreateClient>({
        resolver: zodResolver(pageCreateClientSchema),
    });

    const onSubmit: SubmitHandler<PageCreateClient> = async (data, event) => {
        event?.preventDefault();

        try {
            const response = await fetch("/api/editor/page/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: data.title, slug: data.slug }),
            });

            if (!response.ok) {
                setError("title", {
                    type: "manual",
                    message: "Name can't be empty",
                });
                console.log("Name can't be empty");
                return;
            } else {
                console.log("Created Page");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <dialog ref={ref} className="addpagemodal" open>
            <h1 className="title">Add a new page</h1>
            <form onSubmit={onSubmit} className="addpage-form">
                <label htmlFor="pageName">Page Name</label>
                <input type="text" id="title" />
                <label htmlFor="pageName">Slug</label>
                <input type="text" id="slug" />

                <DefaultButton buttonType="submit" type="toggle">
                    Add page
                </DefaultButton>
            </form>
        </dialog>
    );
}
