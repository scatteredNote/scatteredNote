import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import { createGithubFolder } from "../../../libs/githubops";
import fs from 'fs';

export default NextAuth({
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
  },
})