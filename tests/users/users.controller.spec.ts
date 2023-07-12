import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../../src/users/users.service'
import { UserEntity } from '../../src/users/entities/user.entity'
import { UsersController } from '../../src/users/users.controller'

const users: UserEntity[] = [
  new UserEntity({
    id: '6e523f71-510d-4b9e-8253-475f282e6a02',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '12345',
  }),
]

const [oneUser] = users

const mockUserService = {
  findAll: jest.fn().mockResolvedValue(users),
  findOne: jest.fn().mockResolvedValue(oneUser),
  create: jest.fn().mockResolvedValue(oneUser),
  update: jest.fn().mockResolvedValue(oneUser),
  remove: jest.fn().mockResolvedValue(undefined),
}

describe('UsersController', () => {
  let controller: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile()

    controller = module.get<UsersController>(UsersController)
    usersService = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(usersService).toBeDefined()
  })

  it('should return a list of users', async () => {
    const result = await controller.findAll()
    expect(result).toEqual(users)
    expect(typeof result).toEqual('object')
  })

  it('should return a single user', async () => {
    const result = await controller.findOne(oneUser.id)
    expect(result).toEqual(oneUser)
  })

  it('should create an user', async () => {
    const result = await controller.create(oneUser)
    expect(result.id).toEqual(oneUser.id)
    expect(result.name).toEqual(oneUser.name)
    expect(result.email).toEqual(oneUser.email)
  })

  it('should update an user', async () => {
    const result = await controller.update(oneUser.id, oneUser)
    expect(result.name).toEqual(oneUser.name)
  })

  it('should delete an user', async () => {
    const result = await controller.remove('123')
    expect(result).toBeUndefined()
  })
})
