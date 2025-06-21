import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const characters = sqliteTable("characters", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name"),
  age: integer("age"),
  country: text("country"),
  fightingStyle: text("fighting_style"),
  bio: text("bio"),
  imageUrl: text("image_url").notNull(),
  height: text("height"), // e.g., "5'7""
  weight: text("weight"), // e.g., "130 lbs"
  bloodType: text("blood_type"),
  occupation: text("occupation"),
  hobbies: text("hobbies"),
  likes: text("likes"),
  dislikes: text("dislikes"),
  debut: text("debut"), // First Tekken game they appeared in
  votes: integer("votes").default(0),
  wins: integer("wins").default(0),
  battles: integer("battles").default(0),
  winRate: real("win_rate").default(0), // Calculated field
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default("datetime('now')"),
  updatedAt: text("updated_at").default("datetime('now')"),
});

export const battles = sqliteTable("battles", {
  id: integer("id").primaryKey(),
  character1Id: integer("character1_id").references(() => characters.id),
  character2Id: integer("character2_id").references(() => characters.id),
  winnerId: integer("winner_id").references(() => characters.id),
  timestamp: text("timestamp").default("datetime('now')"),
});

export const streaks = sqliteTable("streaks", {
  id: integer("id").primaryKey(),
  characterId: integer("character_id").references(() => characters.id),
  streakCount: integer("streak_count").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  startedAt: text("started_at").default("datetime('now')"),
  endedAt: text("ended_at"),
});

export type Character = typeof characters.$inferSelect;
export type NewCharacter = typeof characters.$inferInsert;
export type Battle = typeof battles.$inferSelect;
export type NewBattle = typeof battles.$inferInsert;
export type Streak = typeof streaks.$inferSelect;
export type NewStreak = typeof streaks.$inferInsert;
