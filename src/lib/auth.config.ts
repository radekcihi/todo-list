import { compare } from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemes/user"
import { getUserByEmail } from "@/db/user"

export default {
  providers: [
    Credentials({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isValid = await compare(
            password,
            user.password,
          );

          if (isValid) return user;
        }

        return null;
      }
    }),
  ],


} satisfies NextAuthConfig