import type { SchoolGateway } from '~/application/gateways/school.gateway'
import type { UserGateway } from '~/application/gateways/user.gateway'
import { BadRequest, Created } from '~/application/shared/notify'

import { School } from '~/domain/entities/school'
import { User } from '~/domain/entities/user'
import { Crypt } from '~/domain/shared/crypt'
import { type Either, left, right } from '~/domain/shared/either'
import type { UseCase } from '~/domain/shared/usecase'

export type CreateAccountInput = {
  name: string
  email: string
  phone: string
  password: string
  taxId: string
}

export type CreateAccountOutput = Either<BadRequest, Created>

export class CreateAccountUseCase
  implements UseCase<CreateAccountInput, CreateAccountOutput>
{
  constructor(
    private readonly userGateway: UserGateway,
    private readonly schoolGateway: SchoolGateway
  ) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
    const { name, email, phone, password, taxId } = input

    const schoolAlreadyExists = await this.schoolGateway.findByTaxId(taxId)

    if (schoolAlreadyExists) {
      return left(BadRequest.send('School already exists'))
    }

    const school = School.instance({
      name,
      email,
      phone,
      taxId,
    })

    await this.schoolGateway.create(school)

    const passwordHash = Crypt.hash(password)

    const user = User.instance({
      name,
      email,
      password: passwordHash,
    })

    await this.userGateway.create(user, school.id)

    return right(Created.send('Account created successfully'))
  }
}
