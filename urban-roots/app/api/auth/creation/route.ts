import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";
import {unstable_noStore as noStore} from "next/cache";

export async function GET(req: NextRequest) {
    noStore();
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || user === null || !user.id)
        throw new Error("Quelque chose s'est mal passé, veuillez réessayer")

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    if(!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                imageUrl: user.picture,
                userName: generateUsername("-", 3, 15),
            }
        })
    }

    const redirectUrl = process.env.CREATION_REDIRECT_URL;
    
    if (!redirectUrl) {
        throw new Error("CREATION_REDIRECT_URL is not defined");
    }
    
    return NextResponse.redirect(
        process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://urbanroots.fr/"
    );
}