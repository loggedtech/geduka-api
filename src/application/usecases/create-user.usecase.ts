import { User } from '~/domain/entities/user'
import { Crypt } from '~/domain/shared/crypt'
import { type Either, left, right } from '~/domain/shared/either'
import type { UseCase } from '~/domain/shared/usecase'

import { BadRequest } from '../shared/notify'

import type { UserGateway } from '../gateways/user.gateway'

export type CreateUserInput = {
  name: string
  email: string
  phone: string
  password: string
  schoolId: string
}

export type CreateUserOutput = Either<BadRequest, User>

export class CreateUserUseCase
  implements UseCase<CreateUserInput, CreateUserOutput>
{
  constructor(private readonly userGateway: UserGateway) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const { name, email, phone, password, schoolId } = input

    const userAlreadyExistsByEmail =
      await this.userGateway.verifyUserByEmail(email)

    if (userAlreadyExistsByEmail) {
      return left(BadRequest.send('Email already exists'))
    }

    const userAlreadyExistsByPhone =
      await this.userGateway.verifyUserByPhone(phone)

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

    await this.userGateway.create(user, schoolId)

    return right(user)
  }
}
