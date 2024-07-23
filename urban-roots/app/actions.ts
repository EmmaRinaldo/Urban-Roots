"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";

export async function updateUsername(prevState: any, formDate: FormData) {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user) {
        return redirect("/api/auth/login");
    }

    const username = formDate.get("username") as string;

    try {

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                userName: username,
            }
        });
    
        return {
            message: "Pseudo mis à jour avec succès !",
            status: 'green',
        };

    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === 'P2002') {
                return {
                    message: "Ce pseudo est déjà pris !",
                    status: 'red',
                }
            };
        }
        throw e;
    }
}


export async function createSubject(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/api/auth/login");
    }

    try {

        const name = formData.get("name") as string;

        const data = await prisma.subjectforum.create({
            data: {
                name: name,
                userId: user.id,
            }
        });

        return redirect(`/subject/${data.name}`); // TODO changer la redirection pour /forum

    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === 'P2002') {
                return {
                    message: "Ce sujet existe déjà !",
                    status: 'error',
                }
            }
        }
        throw e;
    }
}

export async function updateSujetDescription(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user) {
        return redirect("/api/auth/login");
    }

    try {
        const projectName = formData.get("projectName") as string;
        const description = formData.get("description") as string;

        await prisma.subjectforum.update({
            where: {
                name: projectName,
            },
            data: {
                description: description,
            }
        })

        return {
            status: "green",
            message: "Description mise à jour avec succès !",
        }
    } catch(e) {
        return {
            status: "error",
            message: "Une erreur s'est produite lors de la mise à jour de la description",
        }
    }
}

export async function createPost(
    {jsonContent}: {jsonContent: JSONContent | null},
    formData: FormData
) {
    const{getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/api/auth/login");
    }
    
    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const subjectName = formData.get("subjectName") as string;

    const data = await prisma.post.create({
        data: {
            title: title,
            imageString: imageUrl ?? undefined,
            subjectName: subjectName,
            userId: user.id,
            textContent: jsonContent ?? undefined,
        }
    });

    return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string;
    const voteDirection = formData.get("voteDirection") as TypeOfVote;

    const vote = await prisma.vote.findFirst({
        where: {
            postId: postId,
            userId: user.id,
        }
    });

    if(vote) {
        if(vote.voteType === voteDirection) {
            await prisma.vote.delete({
                where: {
                    id: vote.id,
                }
            });

            return revalidatePath("/forum");
        } else {
            await prisma.vote.update({
                where: {
                    id: vote.id,
                },
                data: {
                    voteType: voteDirection,
                }
            });
            return revalidatePath("/forum");
        }
    }

    await prisma.vote.create({
        data: {
            voteType: voteDirection,
            postId: postId,
            userId: user.id,
        }
    });

    return revalidatePath("/forum", "page");
}

export async function createComment(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/api/auth/login");
    }
  
    const comment = formData.get("comment") as string;
    const postId = formData.get("postId") as string;
  
    const data = await prisma.comment.create({
      data: {
        text: comment,
        userId: user.id,
        postId: postId,
      },
    });
  
    revalidatePath(`/post/${postId}`);
  }