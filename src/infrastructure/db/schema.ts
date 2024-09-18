import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'

export const schools = pgTable('schools', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone'),
  taxId: text('tax_id').unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  activedAt: timestamp('actived_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const members = pgTable(
  'members',
  {
    schoolId: text('school_id')
      .references(() => schools.id)
      .notNull(),
    userId: text('user_id')
      .references(() => users.id)
      .notNull(),
    role: text('role').notNull(),
  },
  table => {
    return {
      pk: primaryKey({ columns: [table.schoolId, table.userId] }),
    }
  }
)
