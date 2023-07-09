import { User } from './user.entity'

describe('User tests', () => {
  it('should create an user', () => {
    const user = new User({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
    })
    expect(user.name).toBe('Leonardo')
    expect(user.email).toBe('leonardo@gmail.com')
  })
})
