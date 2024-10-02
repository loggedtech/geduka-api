import type { User } from '~/domain/entities/user'

export interface UserGateway {
  findByPhone(phone: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User, schoolId: string): Promise<void>
}
