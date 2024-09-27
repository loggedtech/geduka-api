import type { AddressGateway } from '~/application/gateways/address.gateway'
import type { SchoolGateway } from '~/application/gateways/school.gateway'
import type { UserGateway } from '~/application/gateways/user.gateway'
import { BadRequest, Created } from '~/application/shared/notify'
import { Address, type AddressProps } from '~/domain/entities/address'

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
  address: AddressProps
}

export type CreateAccountOutput = Either<BadRequest, Created>

export class CreateAccountUseCase
  implements UseCase<CreateAccountInput, CreateAccountOutput>
{
  constructor(
    private readonly userGateway: UserGateway,
    private readonly schoolGateway: SchoolGateway,
    private readonly addressGateway: AddressGateway
  ) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
    const { name, email, phone, password, taxId, address } = input

    const location =
      (await this.addressGateway.findByProps(address)) ??
      Address.instance(address)

    await this.addressGateway.create(location)

    const schoolAlreadyExistsByTaxId =
      await this.schoolGateway.findByTaxId(taxId)

    if (schoolAlreadyExistsByTaxId) {
      return left(BadRequest.send('School already exists'))
    }

    const schoolAlreadyExistsByEmail =
      await this.schoolGateway.findByEmail(email)

    if (schoolAlreadyExistsByEmail) {
      return left(BadRequest.send('School already exists'))
    }

    const school = School.instance({
      name,
      email,
      phone,
      taxId,
      addressId: location.id,
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
