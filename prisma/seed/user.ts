import * as bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { Prisma, PrismaClient } from '@prisma/client'

export const createUser = async (prisma: PrismaClient) => {
  const users: Prisma.UsersCreateInput[] = [
    {
      id: randomUUID(),
      name: 'Leo santos',
      email: 'leonardo@gmail.com',
      password: '@Abc123',
      active: true,
    },
  ]

  const preparedUsers = await Promise.all(
    users.map(async (user: Prisma.UsersCreateInput) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  )

  try {
    await prisma.users.createMany({
      data: preparedUsers,
    })
    console.log('Users created successfully!')
  } catch (error) {
    console.error('Error creating users:', error)
  }
}
