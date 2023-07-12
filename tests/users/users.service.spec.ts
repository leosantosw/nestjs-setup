import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../../src/users/users.service'
import { PrismaService } from '../../src/prisma/prisma.service'
import { UserEntity } from '../../src/users/entities/user.entity'

const users: UserEntity[] = [
  new UserEntity({
    id: '1234',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '12345',
  }),
]

const [oneUser] = users

const db = {
  users: {
    findMany: jest.fn().mockResolvedValue(users),
    findFirst: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockResolvedValue(oneUser),
    update: jest.fn().mockResolvedValue(oneUser),
    delete: jest.fn().mockResolvedValue(undefined),
  },
}

describe('UsersService', () => {
  let service: UsersService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(db)
      .compile()

    service = module.get<UsersService>(UsersService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(prisma).toBeDefined()
  })

  describe('getAll', () => {
    it('should return all users', async () => {
      const allUsers = await service.findAll()

      expect(typeof allUsers).toEqual('object')
      expect(allUsers[0].id).toEqual(oneUser.id)
    })
  })

  describe('getOne', () => {
    it('should return a single user', async () => {
      const userExists = await service.findOne('1234')

      expect(typeof userExists).toEqual('object')
      expect(userExists.id).toEqual(oneUser.id)
    })

    it('should not return a user with a nonexistent ID', async () => {
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValueOnce(undefined)

      expect(async () => {
        await service.findOne('1234')
      }).rejects.toThrowError('User not found')
    })
  })

  describe('insertOne', () => {
    it('should create an user', async () => {
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValueOnce(undefined)

      const createdUser = await service.create({ ...oneUser })

      expect(typeof createdUser).toEqual('object')
      expect(createdUser.name).toEqual(oneUser.name)
    })

    it('should not create a user with an existing email', async () => {
      expect(async () => {
        await service.create({ ...oneUser })
      }).rejects.toThrowError('E-mail already exists')
    })
  })

  describe('updateOne', () => {
    it('should update an user', async () => {
      const updatedUser = await service.update('1234', oneUser)

      expect(updatedUser.name).toEqual(oneUser.name)
      expect(updatedUser.email).toEqual(oneUser.email)
    })

    it('should not update an user with a nonexistent ID', async () => {
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValueOnce(undefined)

      expect(
        async () => await service.update('1234', oneUser)
      ).rejects.toThrowError('User not found')
    })
  })

  describe('deleteOne', () => {
    it('should delete an user', async () => {
      const deletedUser = await service.remove('123')

      expect(deletedUser).toBeUndefined()
    })

    it('should not delete a user with an nonexistent ID', async () => {
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValueOnce(undefined)

      expect(async () => {
        await service.remove('1234')
      }).rejects.toThrowError('User not found')
    })
  })
})
