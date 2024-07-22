"use client";

import { Textarea } from "@/components/ui/textarea";
import { updateSujetDescription } from "../actions";
import { SaveButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";


interface iAppProps {
    projectName: string;
    description: string | null | undefined;
}

const initialState = {
    message: "",
    status: "",
}

export function ProjectDescriptionForm({description, projectName}: iAppProps) {
    
    const [state, formAction] = useFormState(updateSujetDescription, initialState);
    const {toast} = useToast();

    useEffect(() => {
        if(state.status === "green") {
            toast({
                title: "Succès",
                description: state.message,
            });
        } else if(state.status === "error") {
            toast({
                title: "Erreur",
                description: state.message,
                variant: "destructive",
            });
        }   
    }, [state, toast]);

    return (
        <form className="mt-3" action={formAction}>
            <input type="hidden" name="projectName" value={projectName} />
            <Textarea 
                placeholder="Créer la desctription pour votre sujet de discussion"
                maxLength={100}
                name="description"
                defaultValue={description ?? undefined}
            />
            <SaveButton />
        </form>
    )
}