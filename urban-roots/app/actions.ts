"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma } from "@prisma/client";

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

        return redirect("/"); // TODO changer la redirection pour /forum

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
