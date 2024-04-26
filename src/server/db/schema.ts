// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
	index,
	pgTableCreator,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3-gallery_${name}`);

export const posts = createTable(
	"post",
	{
		id: serial("id").primaryKey(),
		title: varchar("title", { length: 256 }),
		url: varchar("url", { length: 512 }),
		createdAt: timestamp("created_at")
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(example) => ({
		nameIndex: index("name_idx").on(example.title),
	}),
);
