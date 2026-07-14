const ldap = require("ldapjs");
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../utils/prisma";
import { compare } from "bcryptjs";

const url = `ldap://${process.env.LDAP_SERVER}`;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, _) => {
        const { username, password } = credentials;
        if (!username || !password) {
          throw new Error("Please enter email and password");
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              userName: username,
            },
          });
          if (!user) {
            throw new Error("No user found");
          }
          const isMatch = await compare(password, user.password);
          if (!isMatch) {
            throw new Error("Wrong password");
          }
          return user;
        } catch (error) {
          console.log("Authorization error: ", error);
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.oracleId;
        token.username = user.username;
        token.password = user.password;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.username = token.username;
        session.password = token.password;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
});
