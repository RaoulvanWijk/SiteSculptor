import React, { useEffect, useRef } from "react";
import "@/resources/styling/components/SideNav/addpagemodal.scss";
import useSideNav from "@/components/hooks/useSideNav";
import DefaultButton from "@/components/interactives/Button";
import { useForm } from "react-hook-form";
import {
    PageCreateClient,
    pageCreateClientSchema,
} from "@/lib/db/schema/pages";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

export default function AddPage() {
    const ref = useRef<HTMLDialogElement>(null);
    const { site_id } = useSideNav();
    const { modal, setModal, setPages } = useSideNav();

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

        const title = event.target.title.value;
        const slug = event.target.slug.value;

        try {
            const response = await fetch("/api/editor/page/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    slug: slug,
                    siteId: site_id,
                }),
            });
            console.log(response);
            const responseData = await response.json();
            console.log(responseData);
            const data = {
                title: title,
                slug: slug,
                id: responseData.id,
            };
            setPages((prev) => [...prev, data]);
        } catch (error) {
            console.error("Error:", error);
        }

        setModal(false);
    };

    // set modal to false when the user clicks outside the modal
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setModal]);

    return (
        <dialog ref={ref} className="addpagemodal">
            <div className="addpagemodal-top">
                <h1 className="title">Add a new page</h1>
                <button
                    className="close"
                    onClick={() => {
                        setModal(false);
                    }}
                >
                    <X />
                </button>
            </div>
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
