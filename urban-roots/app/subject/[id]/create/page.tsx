"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import pfp from '../../../../public/logo-urban-roots.png'
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/app/components/TipTapEditor";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { useState } from "react";
import { createPost } from "@/app/actions";
import { JSONContent } from "@tiptap/react";

const rules = [
    {
        id: 1,
        text: 'Pas de contenu inapproprié',
    },
    {
        id: 2,
        text: 'Respectez les autres',
    },
    {
        id: 3,
        text: 'Pas de publicité ou de spam',
    },
    {
        id: 4,
        text: 'Restez sur le sujet',
    },
    {
        id: 5,
        text: 'Lisez les règles de la communauté',
    }
];

export default function CreatePostRoute({
    params,
}: {
    params: {id: string};
}) {

    const [imageUrl, setImageUrl] = useState<null | string>(null);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [title, setTitle] = useState<null | string>(null);

    const createPostSubject = createPost.bind(null, {jsonContent: json});

    return (
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4">

            <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
                <h1 className="font-semibold">
                    Sujet de discussion:{" "}
                    <Link className="text-primary" href={`/subject/${params.id}`}>{params.id}</Link>
                </h1>
                <Tabs defaultValue="post" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="post"><Text className="h-4 w-4 mr-2" />Post</TabsTrigger>
                        <TabsTrigger value="image"><Video className="h-4 w-4 mr-2"/>Image & Vidéo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        <Card>
                            <form action={createPostSubject}>
                                <input type="hidden" name="imageUrl" value={imageUrl ?? undefined}/>
                                <input type="hidden" name="subjectName" value={params.id}/>
                                <CardHeader>
                                    <Label>Titre</Label>
                                    <Input 
                                        required     
                                        name="title" 
                                        placeholder="Titre"
                                        value={title ?? ""}
                                        onChange={(e) => setTitle(e.target.value)} 
                                    />
                                    <TipTapEditor setJson={setJson} json={json} />
                                </CardHeader>
                                <CardFooter>
                                    <SubmitButtons text="Créer un Post"/>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="image">
                        <Card>
                            <CardHeader>
                                {imageUrl === null ? (
                                    <UploadDropzone
                                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        setImageUrl(res[0].url)
                                    }}
                                    onUploadError={(error: Error) => {
                                        alert('Erreur lors du téléchargement de l\'image');
                                    }}
                                />
                                ): (
                                    <Image src={imageUrl} alt="image téléchargé" width={500} height={400} className="h-80 rounded-lg w-full object-contain"/>
                                )}
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="lg:w-[35%] w-[90%] order-1 md:order-2 mx-auto mb-5">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-2">
                        <Image className="h-12 w-12 bg-white rounded-full" src={pfp} alt="pfp"/>
                        <h1 className="font-medium">Publier sur le forum</h1>
                    </div>
                    <Separator className="mt-2" />

                    <div className="flex flex-col gap-y-5 mt-5">
                        {rules.map((item) => (
                            <div key={item.id}>
                                <p className="text-sm font-medium">
                                    {item.id}. {item.text}
                                </p>
                                <Separator className="mt-2" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

        </div>
    )
}