import { and, eq } from 'drizzle-orm'

import type { AddressGateway } from '~/application/gateways/address.gateway'

import { Address, type AddressProps } from '~/domain/entities/address'

import { db } from '..'
import { addresses } from '../schema'

export class AddressRepository implements AddressGateway {
  async findByProps(props: AddressProps): Promise<Address | null> {
    try {
      const location = await db
        .select()
        .from(addresses)
        .where(
          and(
            eq(addresses.zip, props.zip),
            eq(addresses.place, props.place),
            eq(addresses.number, props.number),
            eq(addresses.complement, props.complement ?? '')
          )
        )

      if (location.length === 0) return null

      return Address.instance(
        {
          zip: location[0].zip,
          place: location[0].place,
          number: location[0].number,
          complement: location[0].complement ?? undefined,
          district: location[0].district,
          city: location[0].city,
          state: location[0].state,
        },
        location[0].id
      )
    } catch (error) {
      console.error('AddressRepository[findByProps] Error:', error)
      return null
    }
  }

  async create(address: Address): Promise<void> {
    try {
      await db.insert(addresses).values([
        {
          id: address.id,
          ...address.props,
        },
      ])
    } catch (error) {
      console.error('AddressRepository[create] Error:', error)
    }
  }
}
