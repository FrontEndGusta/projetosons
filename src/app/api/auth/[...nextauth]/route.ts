import User from "@/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          }).exec();

          if (user) {
            const validPassword = (credentials.password === user.password);

            if (validPassword) {
              return user;
            } else {
              throw new Error("Invalid credentials");
            }
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Unknown error");
        }
      },
    }),
  ],
  pages: {
    error: "/login",
  },
};

export { options as GET, options as POST };
