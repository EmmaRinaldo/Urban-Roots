"use client";

import { useToast } from "@/components/ui/use-toast";
import { Share } from "lucide-react";

export function CopyLink({id}: {id: string}) {

    const {toast} = useToast();

    async function copytoClipboard() {
        await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
        toast({
            title: "Succès",
            description: "Le lien a été copié dans votre presse-papiers",
        })
    }

    return (
        <button className="flex items-center gap-x-1" onClick={copytoClipboard}>
            <Share className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground font-medium text-xs">Partager</p>
        </button>
    )
}