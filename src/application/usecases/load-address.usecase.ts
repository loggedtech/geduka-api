import type { UseCase } from '~/application/shared/usecase'

import { Address, type AddressProps } from '~/domain/entities/address'

import type { AddressGateway } from '../gateways/address.gateway'

export type LoadAddressInput = AddressProps

export type LoadAddressOutput = Address

export class LoadAddressUseCase
  implements UseCase<LoadAddressInput, LoadAddressOutput>
{
  constructor(private readonly addressGateway: AddressGateway) {}

  async execute(input: AddressProps): Promise<LoadAddressOutput> {
    let location = await this.addressGateway.findByProps(input)

    if (location) return location

    location = Address.instance(input)

    await this.addressGateway.create(location)

    return location
  }
}
