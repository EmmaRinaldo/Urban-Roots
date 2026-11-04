"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deletePost } from "../actions";

function DeleteSubmit() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={pending}
            className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-destructive"
        >
            {pending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="mr-1 h-4 w-4" />
            )}
            Supprimer
        </Button>
    );
}

export function DeletePostButton({ postId, redirectTo }: { postId: string; redirectTo?: string }) {
    return (
        <form
            action={deletePost}
            onSubmit={(e) => {
                if (!confirm("Supprimer ce post ? Cette action est irréversible.")) {
                    e.preventDefault();
                }
            }}
        >
            <input type="hidden" name="postId" value={postId} />
            {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
            <DeleteSubmit />
        </form>
    );
}
