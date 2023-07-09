type UserProps = {
  name: string
  email: string
}

export class User {
  readonly name: string
  readonly email: string

  constructor(props: UserProps) {
    Object.assign(this, props)
  }
}
