import { relations } from 'drizzle-orm'
import {
  char,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const addresses = pgTable('addresses', {
  id: char('id', { length: 24 }).primaryKey(),
  zip: char('zip', { length: 8 }).notNull(),
  place: text('place').notNull(),
  number: varchar('number', { length: 20 }).notNull(),
  complement: varchar('complement', { length: 20 }),
  district: varchar('district').notNull(),
  city: varchar('city').notNull(),
  state: char('state', { length: 2 }).notNull(),
})

export const schools = pgTable('schools', {
  id: char('id', { length: 24 }).primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').unique().notNull(),
  phone: char('phone', { length: 11 }),
  taxId: varchar('tax_id', { length: 14 }).unique().notNull(),
  addressId: char('address_id', { length: 24 })
    .references(() => addresses.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const schoolsRelations = relations(schools, ({ many, one }) => ({
  address: one(addresses, {
    fields: [schools.addressId],
    references: [addresses.id],
  }),
  users: many(members),
}))

export const users = pgTable('users', {
  id: char('id', { length: 24 }).primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').unique().notNull(),
  password: text('password').notNull(),
  activedAt: timestamp('actived_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  schools: many(members),
}))

export const members = pgTable(
  'members',
  {
    schoolId: char('school_id', { length: 24 })
      .references(() => schools.id)
      .notNull(),
    userId: char('user_id', { length: 24 })
      .references(() => users.id)
      .notNull(),
    role: varchar('role').notNull(),
  },
  table => {
    return {
      pk: primaryKey({ columns: [table.schoolId, table.userId] }),
    }
  }
)

export const membersRelations = relations(members, ({ one }) => ({
  school: one(schools, {
    fields: [members.schoolId],
    references: [schools.id],
  }),
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
}))
