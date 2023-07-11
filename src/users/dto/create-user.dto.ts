import { UserEntity } from '../entities/user.entity'

export class CreateUserDto extends UserEntity {
  name: string
  email: string
  password: string
}
