import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NodeMailer from "next-auth/providers/nodemailer"
import prisma from "@/src/app/lib/prisma"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        NodeMailer({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        })
    ],
    secret: process.env.AUTH_SECRET,
})