// import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
//import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// export const { auth, signIn, signOut } = NextAuth({

//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);

//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;

//           const user = await getUser(email);
//           if (!user) return null;

//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) return user;
//         }

//         console.log('Invalid credentials');
//         return null;
//       },
//     }),
//   ],
// });



import NextAuth from "next-auth"

import Apple from "next-auth/providers/apple"
// import Auth0 from "next-auth/providers/auth0"
// import AzureB2C from "next-auth/providers/azure-ad-b2c"
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
// import Cognito from "next-auth/providers/cognito"
import Coinbase from "next-auth/providers/coinbase"
import Discord from "next-auth/providers/discord"
// import Dropbox from "next-auth/providers/dropbox"
// import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
// import Gitlab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google"
// import Hubspot from "next-auth/providers/hubspot"
// import Keycloak from "next-auth/providers/keycloak"
// import LinkedIn from "next-auth/providers/linkedin"
// import Netlify from "next-auth/providers/netlify"
// import Okta from "next-auth/providers/okta"
// import Passage from "next-auth/providers/passage"
// import Pinterest from "next-auth/providers/pinterest"
// import Reddit from "next-auth/providers/reddit"
// import Slack from "next-auth/providers/slack"
// import Spotify from "next-auth/providers/spotify"
// import Twitch from "next-auth/providers/twitch"
import Twitter from "next-auth/providers/twitter"
// import WorkOS from "next-auth/providers/workos"
// import Zoom from "next-auth/providers/zoom"

import type { NextAuthConfig } from "next-auth"


import AcmeLogo from '@/app/ui/acme-logo';


import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  // theme: { logo: AcmeLogo },

  // cookies: {
  //   pkceCodeVerifier: {
  //     name: "next-auth.pkce.code_verifier",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none",
  //       path: "/dashboard",
  //       secure: true,
  //     },
  //   },
  // },

  // pkceCodeVerifier: {
  //   name: 'next-auth.pkce.code_verifier',
  //   options: {
  //     httpOnly: true,
  //     sameSite: 'none',
  //     path: '/',
  //     secure: process.env.NODE_ENV === 'production',
  //   },
  // },

    // https://github.com/nextauthjs/next-auth/discussions/6898#discussioncomment-5308820
    // cookies: {
    //   pkceCodeVerifier: {
    //     name: "next-auth.pkce.code_verifier",
    //     options: {
    //       httpOnly: true,
    //       sameSite: "none",
    //       path: "/",
    //       secure: true,
    //     },
    //   },
    // },

  adapter: PrismaAdapter(prisma),
  providers: [
    // Auth0,
    // AzureB2C({
    //   clientId: process.env.AUTH_AZURE_AD_B2C_ID,
    //   clientSecret: process.env.AUTH_AZURE_AD_B2C_SECRET,
    //   issuer: process.env.AUTH_AZURE_AD_B2C_ISSUER,
    // }),
    // BoxyHQSAML({
    //   clientId: "dummy",
    //   clientSecret: "dummy",
    //   issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
    // }),
    // Cognito,

    // Dropbox,
    // Facebook,

    // Gitlab,

    // Hubspot,
    // Keycloak,
    // LinkedIn,
    // Netlify,
    // Okta,
    // Passage,
    // Pinterest,
    // Reddit,
    // Slack,
    // Spotify,
    // Twitch,
    // WorkOS({
    //   connection: process.env.AUTH_WORKOS_CONNECTION,
    // }),
    // Zoom,


    GitHub({
      checks:["none"]
    }),
    Twitter,
    // Twitter({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    //   //version: "2.0", // opt-in to Twitter OAuth 2.0
    // })

    // Twitter({
    //   // clientId: process.env.AUTH_TWITTER_ID,
    //   // clientSecret: process.env.AUTH_TWITTER_SECRET,
    //   //version: "2.0", // opt-in to Twitter OAuth 2.0

    //     // clientId: "dummy",
    //     // clientSecret: "dummy",
    //     // issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
    //   }),
    // Google,
    // Discord,
    // Coinbase,
    // Apple,
  ],
  basePath: "/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)



// import Passkey from "next-auth/providers/passkey"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
 
// const prisma = new PrismaClient()
 
// export default {
//   adapter: PrismaAdapter(prisma),
//   providers: [Passkey],
//   experimental: { enableWebAuthn: true },
// }

