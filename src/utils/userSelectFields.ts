import { Prisma } from 'src/generated/prisma/client';

export const userSelectFields: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  password: false,
  role: true,
  avatar: true,
  createdAt: false,
  updatedAt: false,
};

export type UserSelect = Prisma.UserGetPayload<{
  select: typeof userSelectFields;
}>;
