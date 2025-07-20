import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      profile(params) {
        // Restrict signups to admin email only
        if (
          params.flow === "signUp" &&
          params.email !== process.env.ADMIN_EMAIL
        ) {
          throw new Error(
            "Account creation is restricted to authorized users only"
          );
        }

        return {
          email: params.email as string,
          name: params.name as string,
        };
      },
    }),
  ],
});
