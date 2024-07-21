"use client";

import { createSubject } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
    message: "",
    status: "",
}

export default function SubjectPage() {

    const [state, formAction] = useFormState(createSubject, initialState);
    const {toast} = useToast();

    useEffect(() => {
        if(state.status === "error") {
            toast({
                title: 'Erreur',
                description: state.message,
                variant: 'destructive',
            });
        }
    }, [state, toast])

    return (
        <div className="max-w-[1000px] mx-auto flex flex-col mt-4 lg:px-0 px-5">
            <form action={formAction}>
                <h1 className="text-3xl font-extrabold tracking-tight">Créer un Sujet de Discussion</h1>
                <Separator className="my-4"/>
                <Label className="text-lg">Nom</Label>
                <p className="text-muted-foreground">Le nom du sujet, y compris les majuscules, ne peuvent pas être modifié !</p>

                <div className="relative mt-3">
                    <Input name="name" required className="pl-6" minLength={2} maxLength={21}/>
                </div>
                <p className="mt-1 text-destructive">{state.message}</p>

                <div className="w-full flex mt-5 gap-x-5 justify-end">
                    <Button variant="secondary" asChild>
                        <Link href="/">Annuler</Link>
                    </Button>
                    <SubmitButtons text="Céer un Sujet"/>
                </div>

            </form>
            
        </div>
    )
}