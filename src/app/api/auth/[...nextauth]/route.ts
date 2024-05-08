import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth/utils";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

// Add your custom sign-in page path
const options = {
  ...authOptions,
  pages: {
    signIn: '/login',  // Add your custom sign-in page path here
    signUp: '/signup', // Add your custom sign-up page path here
    // add other custom pages if needed
  },
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
// export default options;