import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

const users: User[] = [
  new User({ name: 'John Doe', email: 'johndoe@gmail.com' }),
]

describe('UsersController', () => {
  let controller: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockReturnValue(users),
            findOne: jest.fn().mockReturnValue(users[0]),
            create: jest.fn().mockReturnValue(users[0]),
            update: jest.fn().mockReturnValue(users[0]),
            remove: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    usersService = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(usersService).toBeDefined()
  })

  it('should return a list of users', () => {
    const result = controller.findAll()
    expect(result).toEqual(users)
    expect(typeof result).toEqual('object')
  })

  it('should return a single user', () => {
    const result = controller.findOne('123')
    expect(result).toEqual(users[0])
  })

  it('should create an user', () => {
    const body: CreateUserDto = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    }
    const result = controller.create(body)
    expect(result).toEqual(body)
  })

  it('should update an user', () => {
    const body: UpdateUserDto = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    }
    const result = controller.update('123', body)
    expect(result).toEqual(body)
  })

  it('should delete an user', () => {
    const result = controller.remove('123')
    expect(result).toBeUndefined()
  })
})
