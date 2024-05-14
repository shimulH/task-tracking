import { InferModel, relations } from 'drizzle-orm';
import {
  integer,
  text,
  boolean,
  pgTable,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const User = pgTable('user', {
  id: text('id').primaryKey().notNull(),

  //   createdAt: timestamp('created_at').defaultNow().notNull(),
  //   updatedAt: timestamp('updated_at').defaultNow().notNull(),
  //   userId: text('user_id').primaryKey().notNull(),
  imageUrl: text('user_image_url').notNull(),
  userFirstName: text('user_first_name').notNull(),
  userLastName: text('user_last_name').notNull(),
});

export const Board = pgTable('boards', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('user_id').references(() => User.id),
});

export const BoardMember = pgTable('card_members', {
  boardId: uuid('card_id').references(() => Board.id),
  userId: text('user_id').references(() => User.id),
});

export const List = pgTable('lists', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  boardId: uuid('board_id').references(() => Board.id),
  position: text('position').notNull(),
});

export const Card = pgTable('cards', {
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

export const CoreLabel = pgTable('core_labels', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  color: varchar('color', { length: 256 }).notNull(),
});

export const BoardLabel = pgTable('board_labels', {
  id: uuid('id').primaryKey().defaultRandom(),
  boardId: uuid('board_id').references(() => Board.id),
  color: varchar('color', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
});

export const CardLabel = pgTable('card_label', {
  labelId: uuid('board_id').references(() => Board.id),
  cardId: uuid('card_id').references(() => Card.id),
});

export const CardMember = pgTable('card_members', {
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
    cardMember: many(CardMember),
    boardMember: many(BoardMember),
    cardActivity: many(CardActivity),
    board: many(Board),
  };
});

export const BoardTableRelations = relations(Board, ({ one, many }) => {
  return {
    user: one(User, { fields: [Board.userId], references: [User.id] }),
    boardLabel: many(BoardLabel),
    list: many(List),
    boardMember: many(BoardMember),
  };
});

export const BoardMemberTableRelations = relations(
  BoardMember,
  ({ one, many }) => {
    return {
      user: one(User, { fields: [BoardMember.userId], references: [User.id] }),
      board: one(Board, {
        fields: [BoardMember.boardId],
        references: [Board.id],
      }),
    };
  }
);

export const CardMemberTableRelations = relations(
  CardMember,
  ({ one, many }) => {
    return {
      user: one(User, { fields: [CardMember.userId], references: [User.id] }),
      card: one(Card, { fields: [CardMember.cardId], references: [Card.id] }),
    };
  }
);

export const CardActivityTableRelations = relations(
  CardActivity,
  ({ one, many }) => {
    return {
      user: one(User, { fields: [CardActivity.userId], references: [User.id] }),
      card: one(Card, { fields: [CardActivity.cardId], references: [Card.id] }),
    };
  }
);

export const ListTableRelations = relations(List, ({ one, many }) => {
  return {
    board: one(Board, { fields: [List.boardId], references: [Board.id] }),
    card: many(Card),
  };
});

export const CardTableRelations = relations(Card, ({ one, many }) => {
  return {
    list: one(List, { fields: [Card.listId], references: [List.id] }),
    cardMember: many(CardMember),
    cardLabel: many(CardLabel),
  };
});

export const CarDLabelTableRelations = relations(CardLabel, ({ one, many }) => {
  return {
    boardLabelId: one(BoardLabel, {
      fields: [CardLabel.labelId],
      references: [BoardLabel.id],
    }),
    card: one(Card, { fields: [CardLabel.cardId], references: [Card.id] }),
  };
});

export const BoardDLabelTableRelations = relations(
  BoardLabel,
  ({ one, many }) => {
    return {
      board: one(Board, {
        fields: [BoardLabel.boardId],
        references: [Board.id],
      }),
      cardLabel: many(CardLabel),
    };
  }
);

export type UserDef = typeof User.$inferSelect;
export type ListDef = typeof List.$inferSelect;
export type BoardDef = typeof Board.$inferSelect;
export type CardDef = typeof Card.$inferSelect;
