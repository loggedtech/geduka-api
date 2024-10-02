import type { Address, AddressProps } from '~/domain/entities/address'

export interface AddressGateway {
  findByProps(props: AddressProps): Promise<Address | null>
  create(address: Address): Promise<void>
}
