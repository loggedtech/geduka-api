import type { AddressProps } from '~/domain/entities/address'
import { Crypt } from '~/domain/shared/crypt'
import { type Either, left, right } from '~/domain/shared/either'
import type { UseCase } from '~/domain/shared/usecase'

import { type BadRequest, Created } from '~/application/shared/notify'

import type { CreateAddressUseCase } from '../create-address.usecase'
import type { CreateSchoolUseCase } from '../create-school.usecase'
import type { CreateUserUseCase } from '../create-user.usecase'

export type CreateAccountInput = {
  name: string
  email: string
  phone: string
  password: string
  taxId: string
  address: AddressProps
}

export type CreateAccountOutput = Either<BadRequest, Created>

export class CreateAccountUseCase
  implements UseCase<CreateAccountInput, CreateAccountOutput>
{
  constructor(
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly createSchoolUseCase: CreateSchoolUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
    const { name, email, phone, password, taxId, address } = input

    const location = await this.createAddressUseCase.execute(address)

    const school = await this.createSchoolUseCase.execute({
      name,
      email,
      phone,
      taxId,
      addressId: location.id,
    })

    if (school.isLeft()) return left(school.value)

    const passwordHash = Crypt.hash(password)

    const user = await this.createUserUseCase.execute({
      name,
      email,
      phone,
      password: passwordHash,
      schoolId: school.value.id,
    })

    if (user.isLeft()) return left(user.value)

    return right(Created.send('Account created successfully'))
  }
}
