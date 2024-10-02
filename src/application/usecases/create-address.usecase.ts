import { Address, type AddressProps } from '~/domain/entities/address'
import type { UseCase } from '~/domain/shared/usecase'

import type { AddressGateway } from '../gateways/address.gateway'

export type CreateAddressInput = AddressProps

export type CreateAddressOutput = Address

export class CreateAddressUseCase
  implements UseCase<CreateAddressInput, CreateAddressOutput>
{
  constructor(private readonly addressGateway: AddressGateway) {}

  async execute(input: AddressProps): Promise<CreateAddressOutput> {
    let location = await this.addressGateway.findByProps(input)

    if (location) return location

    location = Address.instance(input)

    await this.addressGateway.create(location)

    return location
  }
}
