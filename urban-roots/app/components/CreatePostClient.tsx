"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import pfp from '../../public/logo-urban-roots.png'
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { TipTapEditor } from "@/app/components/TipTapEditor";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { useState, useTransition } from "react";
import { createPost, createSubjectInline } from "@/app/actions";

const NEW_SUBJECT_VALUE = "__new__";
import { JSONContent } from "@tiptap/react";

const rules = [
    { id: 1, text: 'Pas de contenu inapproprié' },
    { id: 2, text: 'Respectez les autres' },
    { id: 3, text: 'Pas de publicité ou de spam' },
    { id: 4, text: 'Restez sur le sujet' },
    { id: 5, text: 'Lisez les règles de la communauté' },
];

interface CreatePostClientProps {
    subjects: string[];
    defaultSubject?: string;
}

export function CreatePostClient({ subjects, defaultSubject }: CreatePostClientProps) {
    const [imageUrl, setImageUrl] = useState<null | string>(null);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [title, setTitle] = useState<null | string>(null);

    const createPostSubject = createPost.bind(null, { jsonContent: json });

    // On ne présélectionne que si le sujet existe vraiment
    const initialSubject = defaultSubject && subjects.includes(defaultSubject) ? defaultSubject : undefined;

    const { toast } = useToast();
    const [subjectList, setSubjectList] = useState<string[]>(subjects);
    const [selectedSubject, setSelectedSubject] = useState<string | undefined>(initialSubject);
    const [creating, setCreating] = useState(subjects.length === 0);
    const [newSubjectName, setNewSubjectName] = useState("");
    const [subjectError, setSubjectError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleSubjectChange = (value: string) => {
        if (value === NEW_SUBJECT_VALUE) {
            setCreating(true);
            setSubjectError(null);
            return;
        }
        setSelectedSubject(value);
    };

    const handleCreateSubject = () => {
        setSubjectError(null);
        startTransition(async () => {
            const res = await createSubjectInline(newSubjectName);
            if (!res.ok) {
                setSubjectError(res.message);
                return;
            }
            setSubjectList((list) => [...list, res.name].sort((a, b) => a.localeCompare(b, "fr")));
            setSelectedSubject(res.name);
            setNewSubjectName("");
            setCreating(false);
            toast({ title: "Sujet créé", description: `« ${res.name} » a été ajouté.` });
        });
    };

    return (
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4">

            <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
                <h1 className="font-semibold">Créer un post</h1>

                    <Tabs defaultValue="post" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="post"><Text className="h-4 w-4 mr-2" />Post</TabsTrigger>
                            <TabsTrigger value="image"><Video className="h-4 w-4 mr-2" />Image & Vidéo</TabsTrigger>
                        </TabsList>
                        <TabsContent value="post">
                            <Card>
                                <form action={createPostSubject}>
                                    <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />
                                    <CardHeader className="gap-y-2">
                                        <Label>Sujet de discussion</Label>
                                        <Select
                                            name="subjectName"
                                            required
                                            value={selectedSubject}
                                            onValueChange={handleSubjectChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir un sujet de discussion" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjectList.map((name) => (
                                                    <SelectItem key={name} value={name}>
                                                        {name}
                                                    </SelectItem>
                                                ))}
                                                {subjectList.length > 0 && <SelectSeparator />}
                                                <SelectItem value={NEW_SUBJECT_VALUE}>
                                                    <span className="flex items-center text-primary">
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Créer un nouveau sujet
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {creating && (
                                            <div className="flex flex-col gap-y-1">
                                                <div className="flex items-center gap-x-2">
                                                    <Input
                                                        autoFocus
                                                        placeholder="Nom du nouveau sujet"
                                                        value={newSubjectName}
                                                        minLength={2}
                                                        maxLength={21}
                                                        onChange={(e) => setNewSubjectName(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                handleCreateSubject();
                                                            }
                                                        }}
                                                    />
                                                    <Button type="button" onClick={handleCreateSubject} disabled={isPending}>
                                                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                        Ajouter
                                                    </Button>
                                                    {subjectList.length > 0 && (
                                                        <Button
                                                            type="button"
                                                            variant="secondary"
                                                            onClick={() => {
                                                                setCreating(false);
                                                                setNewSubjectName("");
                                                                setSubjectError(null);
                                                            }}
                                                        >
                                                            Annuler
                                                        </Button>
                                                    )}
                                                </div>
                                                {subjectList.length === 0 && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Aucun sujet pour l&apos;instant : créez le premier !
                                                    </p>
                                                )}
                                                {subjectError && (
                                                    <p className="text-sm text-destructive">{subjectError}</p>
                                                )}
                                            </div>
                                        )}

                                        <Label className="pt-2">Titre</Label>
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
                                        <SubmitButtons text="Créer un Post" />
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
                                                console.log("Upload complete", res);
                                                if (res && res[0]?.url) {
                                                    setImageUrl(res[0].url);
                                                }
                                            }}
                                            onUploadError={(error: Error) => {
                                                console.error("Upload error", error);
                                                alert('Erreur lors du téléchargement de l\'image: ' + error.message);
                                            }}
                                        />
                                    ) : (
                                        <Image src={imageUrl} alt="image téléchargé" width={500} height={400} className="h-80 rounded-lg w-full object-contain" />
                                    )}
                                </CardHeader>
                            </Card>
                        </TabsContent>
                    </Tabs>
            </div>

            <div className="lg:w-[35%] w-[90%] order-1 md:order-2 mx-auto mb-5">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-2">
                        <Image className="h-12 w-12 bg-white rounded-full" src={pfp} alt="pfp" />
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
    );
}
