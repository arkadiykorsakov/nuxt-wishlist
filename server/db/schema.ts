import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core'

const createdAt = () => integer({ mode: 'timestamp' }).notNull().$defaultFn(() => new Date())

export const users = sqliteTable('users', {
  id: integer().primaryKey({
    autoIncrement: true,
  }),
  githubId: integer().notNull().unique(),
  login: text().notNull(),
  name: text().notNull(),
  avatarUrl: text().notNull(),
  createdAt: createdAt(),
})

export const wishlists = sqliteTable('wishlists', {
  id: integer().primaryKey({
    autoIncrement: true,
  }),
  userId: integer().references(() => users.id, {
    onDelete: 'cascade',
  }).notNull(),
  title: text().notNull(),
  createdAt: createdAt(),
}, table => [
  index('wishlists_user_id_idx').on(table.userId),
])
