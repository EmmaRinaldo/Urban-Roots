"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { updateUsername } from "../actions";
import { SubmitButtons } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
import { title } from "process";


const initialState = {
    message: "",
    status: "",
};

export function SettingsForm({
    username,
}: {
    username: string | null | undefined;
}) {

    const  [state, formAction] = useFormState(updateUsername, initialState)
    const {toast} = useToast();

    useEffect(() => {
        if(state?.status === 'green') {
            toast({
                title: 'Succès',
                description: state.message,
            });
        } else if(state?.status === 'red') {
            toast({
                title: 'Erreur',
                description: state.message,
                variant: 'destructive',
            });
        }
    }, [state, toast])

    return (
        <form action={formAction}>
            <h1 className="text-3xl font-extrabold tracking-tight">Paramètres</h1>

            <Separator className="my-4" />
            <Label className="text-lg">Pseudo</Label>
            <p className="text-muted-foreground">Sur cette page Paramètre vous pouvez changer votre pseudo ! </p>

            <Input 
                defaultValue={username ?? undefined} 
                name="username" 
                required 
                className="mt-2" 
                min={2} 
                max={21}
            />

            {state?.status === 'red' && (<p className="mt-1 text-destructive">{state.message}</p>)}

            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href="/">Annuler</Link>
                </Button>
                <SubmitButtons text="Changer mon Pseudo"/>
            </div>

        </form>
    );
}