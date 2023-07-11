import { UserEntity } from './user.entity'

describe('User tests', () => {
  it('should create an user', () => {
    const user = new UserEntity({
      id: '123',
      password: '12345',
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
    })
    expect(user.name).toBe('Leonardo')
    expect(user.email).toBe('leonardo@gmail.com')
  })
})
