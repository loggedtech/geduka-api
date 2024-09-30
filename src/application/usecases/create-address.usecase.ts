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
    const { zip, place, number, complement, district, city, state } = input

    const location =
      (await this.addressGateway.findByProps({
        zip,
        place,
        number,
        complement,
        district,
        city,
        state,
      })) ??
      Address.instance({
        zip,
        place,
        number,
        complement,
        district,
        city,
        state,
      })

    await this.addressGateway.create(location)

    return location
  }
}
