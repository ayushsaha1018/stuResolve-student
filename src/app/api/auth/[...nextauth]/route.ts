import { users } from "@/helpers/constants";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return;

        console.log(credentials);
        const { email, password } = credentials;

        try {
          console.log("here1");
          const user = await axios.post(
            "https://sturesolve-api.onrender.com/login",
            {
              email,
              password,
            }
          );
          console.log("here2");

          console.log(user.data);
          let userdetails = {
            data: {
              ...user.data.user,
              token: user.data.token,
            },
          };
          console.log(userdetails);

          return userdetails.data;
        } catch (error) {
          console.log("here3");
          return null;
        }
        // if (!credentials || !credentials.email || !credentials.password)
        //   return null;

        // const user = users.find((item) => item.email === credentials.email);

        // if (user?.password === credentials.password) {
        //   return user;
        // }
        // return null;
      },
    }),
  ],

  secret: "123445657657",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
