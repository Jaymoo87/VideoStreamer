import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import prismadb from '@/library/prismadb';

export default NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and Password are required');
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error('Username or Password Incorrect!');
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
        if (!isCorrectPassword) {
          throw new Error('Username or Password Incorrect');
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: '/Auth',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});