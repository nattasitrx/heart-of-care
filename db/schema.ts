import { sqliteTable, text, integer, index, primaryKey } from 'drizzle-orm/sqlite-core';
export const sessions = sqliteTable('play_sessions', {
 userId: text('user_id').notNull(),
 id: text('id').notNull(),
 startedAt: text('started_at').notNull(),
 updatedAt: text('updated_at').notNull(),
 status: text('status').notNull(),
 answerCount: integer('answer_count').notNull(),
 revision: integer('revision').notNull(),
 payload: text('payload').notNull()
}, table => [primaryKey({columns:[table.userId, table.id]}),index('idx_play_sessions_user_started').on(table.userId, table.startedAt),index('idx_play_sessions_started_id_user').on(table.startedAt,table.id,table.userId)]);
export const adminSessions = sqliteTable('admin_sessions',{tokenHash:text('token_hash').primaryKey(),expiresAt:integer('expires_at').notNull()});
export const adminAttempts = sqliteTable('admin_login_attempts',{key:text('key').primaryKey(),attempts:integer('attempts').notNull(),startedAt:integer('started_at').notNull()});
