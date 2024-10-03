import { Crypt } from '~/application/shared/crypt'
import { type Either, left, right } from '~/application/shared/either'
import { type BadRequest, Created } from '~/application/shared/notify'
import type { Role } from '~/application/shared/role'
import type { UseCase } from '~/application/shared/usecase'

import type { AddressProps } from '~/domain/entities/address'

import type { CreateSchoolUseCase } from '../create-school.usecase'
import type { CreateUserUseCase } from '../create-user.usecase'
import type { LoadAddressUseCase } from '../load-address.usecase'

export type CreateAccountInput = {
  name: string
  email: string
  phone: string
  role: Role
  password: string
  taxId: string
  address: AddressProps
}

export type CreateAccountOutput = Either<BadRequest, Created>

export class CreateAccountUseCase
  implements UseCase<CreateAccountInput, CreateAccountOutput>
{
  constructor(
    private readonly loadAddressUseCase: LoadAddressUseCase,
    private readonly createSchoolUseCase: CreateSchoolUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
    const { name, email, phone, password, role, taxId, address } = input

    const location = await this.loadAddressUseCase.execute(address)

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
      role,
      password: passwordHash,
      schoolId: school.value.id,
    })

    if (user.isLeft()) return left(user.value)

    return right(Created.send('Account created successfully'))
  }
}
