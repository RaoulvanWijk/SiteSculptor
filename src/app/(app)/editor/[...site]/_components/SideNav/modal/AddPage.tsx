import React, { startTransition, useEffect, useRef } from "react";
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
import { usePathname, useRouter } from "next/navigation";

export default function AddPage() {
    const ref = useRef<HTMLDialogElement>(null);
    const { site_id } = useSideNav();
    const { modal, setModal, isLoading, setPage } = useSideNav();
    const router = useRouter();

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

    const onSubmit = async (event: any) => {
        event?.preventDefault();

        const data = {
            title: event.target.title.value,
            slug: event.target.slug.value,
            siteId: site_id,
        };

        try {
            const response = await fetch("/api/editor/page/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    slug: data.slug,
                    siteId: data.siteId,
                }),
            });
        } catch (error) {
            console.error("Error:", error);
        }

        setPage((prev) => [...prev, data]);
        setModal(false);
    };

    return (
        <dialog ref={ref} className="addpagemodal">
            <h1 className="title">Add a new page</h1>
            <form onSubmit={onSubmit} className="addpage-form" method="POST">
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
