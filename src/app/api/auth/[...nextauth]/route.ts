import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connect from "@/utils/db";
import User from "@/models/User";

const Options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connect();

        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            throw new Error("Credenciais incompletas!");
          }

          const user = await User.findOne({ email });

          if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
              return {
                id: user._id,
                name: user.name,
                email: user.email,
                department: user.department
              };
            } else {
              throw new Error("Credenciais erradas!");
            }
          } else {
            throw new Error("Credenciais erradas!");
          }
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? "";
        token.name = user.name ?? "";
       
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    // arrumar o trigger aq
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.department = token.department
      }
      return session;
    },
  },
  pages: {
    error: "/login",
    signIn: "/dashboard",
    signOut: "/login"
  },
};

const handler = NextAuth(Options);

export { handler as GET, handler as POST };
