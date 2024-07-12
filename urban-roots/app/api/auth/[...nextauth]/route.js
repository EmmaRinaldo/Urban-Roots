import User from "@/models/User";
import { connectToDB } from "@/mongodb/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                await connectToDB()

                /** Check si utilisateur existe */
                const user = await User.findOne({ email: credentials.email })

                if (!user) {
                    throw new Error("Email ou mot de passe incorrect")
                }

                /** Compare le mot de passe */
                const isMatch = await compare(credentials.password, user.password)

                if (!isMatch) {
                    throw new Error("Email ou mot de passe incorrect")
                }

                return user
            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {

        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()

            session.user = { ...session.user, ...sessionUser._doc }

            return session
        },

        async signIn({ account, profile }) {
            if (account.provider === "google") {
                await connectToDB();
        
                let user = await User.findOne({ email: profile.email });
        
                if (!user) {
                  user = await User.create({
                    email: profile.email,
                    username: profile.name,
                    profileImagePath: profile.picture,
                  });
                }
        
                return true;
            }
            return true;
        },
    }
})

export { handler as GET, handler as POST }