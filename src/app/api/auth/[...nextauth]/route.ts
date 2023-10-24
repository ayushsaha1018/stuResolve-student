import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            "https://sturesolve-api.onrender.com/login",
            credentials
          );
          console.log(res.data);

          return res.data;
        } catch (error: any) {
          return error?.response?.message;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
