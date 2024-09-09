import { Card } from "@/components/ui/card";
import Image from "next/image";
import pfp from '../../public/hero-image.png'
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageDown, Link2 } from "lucide-react";

interface CreatePostCardProps {
    projectname: string;
}

export function CreatePostCard({ projectname }: CreatePostCardProps) {
    return (
        <Card className="px-4 py-2 flex items-center gap-x-4">
            <Link href="/forum" className="h-12 w-fit">
                <Image src={pfp} alt="pfp" className="h-full w-full"/>
            </Link>
            

            <Link href={`/subject/${projectname}/create`} className="w-full">
                <Input placeholder="Créer votre post"/>
            </Link>

            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/subject/${projectname}/create`}>
                        <ImageDown className="w-4 h-4" />
                    </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/subject/${projectname}/create`}>
                        <Link2 className="w-4 h-4"/>
                    </Link>
                </Button>
            </div>
        </Card>
    )
}