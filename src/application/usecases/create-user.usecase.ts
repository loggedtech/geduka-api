import { User } from '~/domain/entities/user'

import type { UserGateway } from '../gateways/user.gateway'
import { Crypt } from '../shared/crypt'
import { type Either, left, right } from '../shared/either'
import { BadRequest } from '../shared/notify'
import type { Role } from '../shared/role'
import type { UseCase } from '../shared/usecase'

export type CreateUserInput = {
  name: string
  email: string
  phone: string
  password: string
  schoolId: string
  role: Role
}

export type CreateUserOutput = Either<BadRequest, User>

export class CreateUserUseCase
  implements UseCase<CreateUserInput, CreateUserOutput>
{
  constructor(private readonly userGateway: UserGateway) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const { name, email, phone, password, schoolId, role } = input

    const userAlreadyExistsByEmail = await this.userGateway.findByEmail(email)

    if (userAlreadyExistsByEmail) {
      return left(BadRequest.send('Email already exists'))
    }

    const userAlreadyExistsByPhone = await this.userGateway.findByPhone(phone)

    if (userAlreadyExistsByPhone) {
      return left(BadRequest.send('Phone already exists'))
    }

    const passwordHash = Crypt.hash(password)

    const user = User.instance({
      name,
      email,
      phone,
      password: passwordHash,
    })

    await this.userGateway.create(user, schoolId, role)

    return right(user)
  }
}
