import GoogleProvider from "next-auth/providers/google";
import connectToDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked when user is authenticated
    async signIn({ user }) {
      // connect to db
      await connectToDB();
      // check if user already exists
      const userExists = await User.findOne({ email: user.email });
      // if not, create a new user
      if (!userExists) {
        const username = user.name.slice(0, 20);
        await User.create({
          email: user.email,
          username,
          image: user.image,
        });
      }
      // return true if user exists or has been created
      return true;
    },
    // session callback function that modifies the session object
    async session({ session }) {
      // Get user from db
      const user = await User.findOne({ email: session.user.email });
      // signIn user from session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
};
