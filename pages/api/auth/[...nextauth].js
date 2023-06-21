import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import { createGithubFolder } from "../../../libs/githubops";
import fs from 'fs';

export const authOptions = {
    theme: {
        colorScheme: "light",
        buttonText: "#fb923c",
    },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "github") {
                await createGithubFolder(profile.login);
            }
            else {
                await createGithubFolder(profile.email.split("@")[0].toLowerCase());
            }

            // Return true to allow the sign-in process to continue
            return true;
        },
        async jwt({ token, user, account, profile }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
                token.username = profile?.login ? profile.login : profile.email.split("@")[0].toLowerCase()
            }

            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            session.user.username = token.username

            return session
        },
    },
}


export default NextAuth(authOptions)