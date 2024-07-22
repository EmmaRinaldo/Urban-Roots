import { ProjectDescriptionForm } from "@/app/components/ProjectDescriptionForm";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(name: string) {
    const data = await prisma.subjectforum.findUnique({
        where: {
            name: name,
        },
        select: {
            name: true,
            description: true,
            createdAt: true,
            userId: true,
        }
    });

    return data;
}

export default async function SubjectPage({
    params,
}: {
    params: {id: string};
}) {

    const data = await getData(params.id);
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return(
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4 lg:px-0 px:5">

            <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
                <h1>Hello from the post section</h1>
            </div>

            <div className="lg:w-[35%] w-[90%] order-1 md:order-2 mx-auto">
                <Card>
                    <div className="bg-muted p-4 font-semibold">
                        A propos
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-3">
                            <Image 
                                src={`https://avatar.vercel.sh/${data?.name}`} 
                                alt="Image du sujet"
                                width={60}
                                height={60}
                                className="rounded-full h-16 w-16"
                            />
                            <Link href={`/subject/${data?.name}`} className="font-medium">
                                {data?.name}
                            </Link>
                        </div>
                        {user?.id === data?.userId ? (
                            <ProjectDescriptionForm 
                                description={data?.description}
                                projectName={params.id}
                            />
                        ): (
                            <p className="text-sm font-normal text-secondary-foreground mt-2">
                                {data?.description}
                            </p>
                        )}

                        <div className="flex items-center gap-x-2 mt-4">
                            <Cake className="h-5 w-5 text-muted-foreground"/>
                            <p className="text-muted-foreground font-medium text-sm">
                                Créer le : {new Date(data?.createdAt as Date).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <Separator className="my-5"/>
                        <Button asChild className="rounded-full w-full">
                            <Link href={user?.id ? `/subject/${data?.name}/create` : '/api/auth/login'}>Créer un Post</Link>
                        </Button>
                        
                    </div>
                </Card>

            </div>

        </div>
    )
}