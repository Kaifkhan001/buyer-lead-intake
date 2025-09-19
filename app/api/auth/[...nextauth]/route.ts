import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import  CredentialsProvider  from "next-auth/providers/credentials"
import prisma from "@/app/utils/prisma";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
       name: "credentials",
       credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email"},
       },
       async authorize(credentials){
            const { email } = credentials as {
                email: string
            };

            if(!email) return  null;

            const isUser = await prisma.user.findFirst({
                where: {
                    email,
                }
            });

            if(!isUser) return null;

            return isUser;
       },
    }),
  ],
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    error: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }){
        if(user){
            token.id = user.id;
            token.email = user.email
        }
        return token;
    },
    async session({ session, token }){
        if(session.user){
            session.user.id = token.id as string;
            session.user.email = token.email as string;
        }
        return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 1 Day
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};