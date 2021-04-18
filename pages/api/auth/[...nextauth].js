// pages/api/auth/[...nextauth].js

import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import prisma from "../../../libs/getPrisma.js";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
});
