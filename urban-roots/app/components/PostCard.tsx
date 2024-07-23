import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../actions";
import { DownVote, UpVote } from "./SubmitButtons";
import { RenderToJson } from "./RendertoJson";

interface iAppProps {
    title: string;
    jsonContent: any;
    id: string;
    subjectName: string;
    userName: string;
    imageString: string | null;
    voteCount: number;
    commentAmount: number;
}

export function PostCard({id, imageString, jsonContent, subjectName, title, userName, voteCount, commentAmount,}: iAppProps) {
    return(
        <Card className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="postId" value={id} />
                    <UpVote />
                </form>
                {voteCount}
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="DOWN" />
                    <input type="hidden" name="postId" value={id} />
                    <DownVote />
                </form>
            </div>

            <div>
                <div className="flex items-center gap-x-2 p-2">
                    <Link className="font-semibold text-xs" href={`/subject/${subjectName}`}>
                        {subjectName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        Posté par: <span className="hover:text-primary">{userName}</span>
                    </p>
                </div>

                <div className="px-2">
                    <Link href={`/post/${id}`}>
                        <h1 className="font-medium mt-1 text-lg">{title}</h1>
                    </Link>
                </div>

                <div className="max-h-[300px] overflow-hidden">
                    {imageString ? (
                        <Image src={imageString} alt="Post Image" width={600} height={300} className="w-full h-full mt-2" />
                    ): (
                        <RenderToJson data={jsonContent} />
                    )}
                </div>

                <div className="m-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-1">
                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                        <p className="text-muted-foreground font-medium text-xs">
                            {commentAmount} Commentaires
                        </p>
                    </div>
                    <CopyLink id={id} />
                </div>
            </div>
        </Card>
    )
}