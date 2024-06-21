import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connect from "@/utils/db";

const options = NextAuth({
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" }
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
              return user;
            } else {
              throw new Error("Credenciais erradas!");
            }
          } else {
            throw new Error("Credenciais erradas!");
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Unknown error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
  pages: {
    error: "/login",
  },
});

export { options as GET, options as POST };
