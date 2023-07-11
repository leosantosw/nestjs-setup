import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const emailAlreadyExists = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    })

    if (emailAlreadyExists) {
      throw new HttpException('E-mail already exists', HttpStatus.CONFLICT)
    }

    const createdUser = await this.prisma.users.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 8),
      },
    })

    return {
      ...createdUser,
      password: undefined,
    }
  }

  findAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        phone: true,
        description: true,
        first_access: true,
        created_at: true,
        updated_at: true,
        username: true,
      },
    })
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findFirst({ where: { id } })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return {
      ...user,
      password: undefined,
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.users.findFirst({
      where: { id },
    })

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    })

    return {
      ...updatedUser,
      password: undefined,
    }
  }

  async remove(id: string) {
    const userExists = await this.prisma.users.findFirst({
      where: { id },
    })

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    await this.prisma.users.delete({
      where: {
        id,
      },
    })
  }
}
