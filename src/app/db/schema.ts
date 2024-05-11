import { relations } from 'drizzle-orm';
import {
  integer,
  text,
  boolean,
  pgTable,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const User = pgTable('task_user', {
  id: varchar('id', { length: 256 }).primaryKey().notNull(),

  //   createdAt: timestamp('created_at').defaultNow().notNull(),
  //   updatedAt: timestamp('updated_at').defaultNow().notNull(),
  //   userId: text('user_id').primaryKey().notNull(),
  imageUrl: text('user_image_url').notNull(),
  userFirstName: text('user_first_name').notNull(),
  userLastName: text('user_last_name').notNull(),
});

export const Board = pgTable('board', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('id').references(() => User.id),
});

export const BoardMember = pgTable('card_member', {
  boardId: uuid('card_id').references(() => Board.id),
  userId: text('user_id').references(() => User.id),
});

export const List = pgTable('list', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  boardId: uuid('board_id').references(() => Board.id),
  position: text('position').notNull(),
});

export const Card = pgTable('card', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  listId: uuid('list_id').references(() => List.id),
  description: text('description').notNull(),
  reminderDate: timestamp('reminder_date').notNull(),
  dueDate: timestamp('due_date').notNull(),
  isActive: boolean('is_active').notNull(),
});

export const CoreLabel = pgTable('core_label', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  color: varchar('color', { length: 256 }).notNull(),
});

export const BoardLabel = pgTable('core_label', {
  id: uuid('id').primaryKey().defaultRandom(),
  boardId: uuid('board_id').references(() => Board.id),
  color: varchar('color', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
});

export const CardLabel = pgTable('core_label', {
  labelId: uuid('board_id').references(() => Board.id),
  cardId: text('card_id').references(() => Card.id),
});

export const CardMember = pgTable('card_member', {
  cardId: uuid('card_id').references(() => Card.id),
  userId: text('user_id').references(() => User.id),
});

export const CardActivity = pgTable('card_activity', {
  id: uuid('id').primaryKey().defaultRandom(),
  cardId: uuid('card_id').references(() => Card.id),
  userId: text('user_id').references(() => User.id),
  activity: text('activity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

//Relations
export const UserTableRelations = relations(User, ({ one, many }) => {
  return {
    comments: one(Board),
    cardMember: one(CardMember),
    boardMember: one(BoardMember),
    cardActivity: many(CardActivity),
  };
});

export const BoardTableRelations = relations(Board, ({ one, many }) => {
  return {
    user: many(User),
    cardMember: many(CardMember),
    boardLabel: one(BoardLabel),
    list: one(List),
    boardMember: one(BoardMember),
  };
});

export const BoardMemberTableRelations = relations(
  BoardMember,
  ({ one, many }) => {
    return {
      user: many(Board),
      board: many(Board),
    };
  }
);

export const CardMemberTableRelations = relations(
  CardMember,
  ({ one, many }) => {
    return {
      user: many(User),
      card: many(Card),
    };
  }
);

export const CardActivityTableRelations = relations(
  CardActivity,
  ({ one, many }) => {
    return {
      user: many(User),
      card: many(Card),
    };
  }
);

export const ListTableRelations = relations(List, ({ one, many }) => {
  return {
    board: many(Board),
    card: one(Card),
  };
});

export const CardTableRelations = relations(Card, ({ one, many }) => {
  return {
    list: many(List),
    cardMember: one(CardMember),
    cardLabel: one(CardLabel),
  };
});

export const CarDLabelTableRelations = relations(CardLabel, ({ one, many }) => {
  return {
    boardLabelId: many(BoardLabel),
    card: many(Card),
  };
});

export const BoardDLabelTableRelations = relations(
  BoardLabel,
  ({ one, many }) => {
    return {
      boardId: many(Board),
      card: one(CardLabel),
    };
  }
);
