import { connectToDB } from "@/mongodb/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";

/* USER INSCRIPTION */
export async function POST (req) {
    try {
        /* Connexion MongoDB */
        await connectToDB()

        const data = await req.formData()
        
        /** Prend les infos du formulaire */
        const username = data.get("username")
        const email = data.get("email")
        const password = data.get("password")
        const file = data.get("profileImage")

        if (!file) {
            return NextResponse.json({ message: "Aucun fichier téléchargé" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Utilisation de chemins relatifs pour la gestion des fichiers
        const uploadsDir = path.join(process.cwd(), "public/uploads");
        const profileImagePath = path.join(uploadsDir, file.name);
        await writeFile(profileImagePath, buffer)

        console.log(`ouvre ${profileImagePath} pour voir le fichier téléchargé`)

        /** Check si l'user existe */
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ message: "L'utilisateur existe déjà" }, { status: 409 })
        }

        /** Hash le mot de passe */
        const saltRounds = 10
        const hashedPassword = await hash(password, saltRounds)


        /** Crée un nouvel utilisateur */
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImagePath: `/uploads/${file.name}`,
        })

        /** Sauvegarder nouvel utilisateur */
        await newUser.save()

        /** Envoyer un message de succès */
        return NextResponse.json({ message: "Utilisateur créé avec succès", user: newUser }, { status: 200 })
        
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Erreur lors de la création de l'utilisateur" }, { status: 500 })
    }
}