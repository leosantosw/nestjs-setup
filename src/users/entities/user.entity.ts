import { randomUUID } from 'node:crypto'

type UserProps = {
  id?: string
  name: string
  email: string
  phone?: string
  active?: boolean
  username?: string
  password: string
  description?: string
  first_access?: boolean
  created_at?: Date
  updated_at?: Date
}

export class UserEntity {
  readonly id?: string
  readonly name: string
  readonly email: string
  readonly phone?: string
  readonly active?: boolean
  readonly username?: string
  readonly password: string
  readonly description?: string
  readonly first_access?: boolean
  readonly created_at?: Date
  readonly updated_at?: Date

  constructor(props: UserProps) {
    if (!this.id) this.id = randomUUID()
    Object.assign(this, props)
  }
}
