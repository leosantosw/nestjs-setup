import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { UserEntity } from './entities/user.entity'

const users: UserEntity[] = [
  new UserEntity({
    id: '6e523f71-510d-4b9e-8253-475f282e6a02',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '12345',
  }),
]

const [firstUser] = users

const mockUserService = {
  findAll: jest.fn().mockResolvedValue(users),
  findOne: jest.fn().mockResolvedValue(firstUser),
  create: jest.fn().mockResolvedValue(firstUser),
  update: jest.fn().mockResolvedValue(firstUser),
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
    const result = await controller.findOne(firstUser.id)
    expect(result).toEqual(firstUser)
  })

  it('should create an user', async () => {
    const result = await controller.create(firstUser)
    expect(result.id).toEqual(firstUser.id)
    expect(result.name).toEqual(firstUser.name)
    expect(result.email).toEqual(firstUser.email)
  })

  it('should update an user', async () => {
    const result = await controller.update(firstUser.id, firstUser)
    expect(result.name).toEqual(firstUser.name)
  })

  it('should delete an user', async () => {
    const result = await controller.remove('123')
    expect(result).toBeUndefined()
  })
})
