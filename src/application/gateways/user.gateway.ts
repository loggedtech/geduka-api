import type { User } from '~/domain/entities/user'

export interface UserGateway {
  verifyUserByEmail(email: string): Promise<boolean>
  verifyUserByPhone(phone: string): Promise<boolean>
  create(user: User, schoolId: string): Promise<void>
}
