import { PrismaClient } from '@prisma/client'
import { createUser } from './user'

const prisma = new PrismaClient()

;(async () => {
  try {
    await createUser(prisma)
    console.log('Data creation completed!')
  } catch (error) {
    console.error('Error creating data:', error)
  } finally {
    await prisma.$disconnect()
  }
})()
